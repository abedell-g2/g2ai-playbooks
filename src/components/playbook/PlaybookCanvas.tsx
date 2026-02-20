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

type ToolNodeData = AITool & { onDelete: (id: string) => void } & Record<string, unknown>
type ToolNode = Node<ToolNodeData, 'toolNode'>
type AppEdge = Edge

const nodeTypes = { toolNode: ToolNode }

let idCounter = 1
const uid = () => `node_${idCounter++}`

export default function PlaybookCanvas() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance<ToolNode, AppEdge> | null>(null)
  const [nodes, setNodes, onNodesChange] = useNodesState<ToolNode>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<AppEdge>([])

  const deleteNode = useCallback(
    (id: string) => setNodes((nds) => nds.filter((n) => n.id !== id)),
    [setNodes]
  )

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            style: { stroke: '#5746b2', strokeWidth: 2 },
          },
          eds
        )
      ),
    [setEdges]
  )

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
          data: { ...tool, onDelete: deleteNode },
        },
      ])
    },
    [rfInstance, setNodes, deleteNode]
  )

  return (
    <div ref={reactFlowWrapper} className="flex-1 h-full">
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
          className="!border-[var(--g2-border)] !bg-[var(--g2-bg)] !rounded-xl overflow-hidden"
          nodeColor="#5746b2"
          maskColor="rgba(250,250,250,0.7)"
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
