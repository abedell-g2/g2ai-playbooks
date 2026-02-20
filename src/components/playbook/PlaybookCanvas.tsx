import { useCallback, useRef, useState } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type Connection,
  type Node,
  type Edge,
  type ReactFlowInstance,
  BackgroundVariant,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import ToolNode from './ToolNode'
import type { AITool } from './ToolSidebar'
import ConnectionModal, { type ConnectionMeta } from './ConnectionModal'

type ToolNodeData = AITool & {
  rating?: number
  onDelete: (id: string) => void
  onRate: (id: string, rating: number) => void
} & Record<string, unknown>
type ToolNode = Node<ToolNodeData, 'toolNode'>
type AppEdge = Edge

const nodeTypes = { toolNode: ToolNode }

let idCounter = 1
const uid = () => `node_${idCounter++}`

export default function PlaybookCanvas({ dark }: { dark: boolean }) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance<ToolNode, AppEdge> | null>(null)
  const [nodes, setNodes, onNodesChange] = useNodesState<ToolNode>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<AppEdge>([])
  const [pendingConnection, setPendingConnection] = useState<Connection | null>(null)

  const deleteNode = useCallback(
    (id: string) => setNodes((nds) => nds.filter((n) => n.id !== id)),
    [setNodes]
  )

  const onRate = useCallback(
    (id: string, rating: number) =>
      setNodes((nds) =>
        nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, rating } } : n))
      ),
    [setNodes]
  )

  const onConnect = useCallback((params: Connection) => {
    setPendingConnection(params)
  }, [])

  function commitEdge(params: Connection, meta?: ConnectionMeta) {
    setEdges((eds) =>
      addEdge(
        {
          ...params,
          animated: true,
          style: { stroke: '#5746b2', strokeWidth: 2 },
          ...(meta?.name && {
            label: meta.name,
            labelStyle: {
              fill: 'var(--g2-dark)',
              fontSize: 11,
              fontWeight: 700,
              fontFamily: 'Figtree, system-ui, sans-serif',
            },
            labelBgStyle: { fill: 'var(--g2-surface)', stroke: 'var(--g2-border)', strokeWidth: 1 },
            labelBgPadding: [6, 3] as [number, number],
            labelBgBorderRadius: 6,
            data: { description: meta.description },
          }),
        },
        eds
      )
    )
    setPendingConnection(null)
  }

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const raw = e.dataTransfer.getData('application/g2-tool')
      if (!raw || !rfInstance || !reactFlowWrapper.current) return

      const tool: AITool = JSON.parse(raw)
      const bounds = reactFlowWrapper.current.getBoundingClientRect()
      const position = rfInstance.screenToFlowPosition({
        x: e.clientX - bounds.left,
        y: e.clientY - bounds.top,
      })

      const id = uid()
      setNodes((nds) => [
        ...nds,
        {
          id,
          type: 'toolNode' as const,
          position,
          data: { ...tool, rating: 0, onDelete: deleteNode, onRate },
        },
      ])
    },
    [rfInstance, setNodes, deleteNode, onRate]
  )

  return (
    <div ref={reactFlowWrapper} className="flex-1 h-full">
      {pendingConnection && (
        <ConnectionModal
          onSubmit={(meta) => commitEdge(pendingConnection, meta)}
          onSkip={() => commitEdge(pendingConnection)}
        />
      )}

      <ReactFlow<ToolNode, AppEdge>
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setRfInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
        className="bg-[var(--g2-bg)]"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1.5}
          color="var(--g2-border)"
        />
        <Controls
          className="!border-[var(--g2-border)] !bg-[var(--g2-bg)] !shadow-sm !rounded-xl overflow-hidden"
        />
        <MiniMap
          className="!rounded-xl overflow-hidden"
          nodeColor="#5746b2"
          maskColor={dark ? 'rgba(14,12,26,0.75)' : 'rgba(250,250,250,0.75)'}
        />

        {nodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center space-y-2">
              <p className="text-3xl">🗂️</p>
              <p className="text-[15px] font-semibold text-[var(--g2-muted)]">
                Drag tools here to build your playbook
              </p>
              <p className="text-[13px] text-[var(--g2-border)]">
                Connect tools to show your AI workflow
              </p>
            </div>
          </div>
        )}
      </ReactFlow>
    </div>
  )
}
