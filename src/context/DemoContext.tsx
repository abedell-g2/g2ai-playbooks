import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

export type DemoModel = 'auth' | 'A' | 'B'

interface DemoContextValue {
  model: DemoModel
  setModel: (m: DemoModel) => void
  loginModalOpen: boolean
  openLoginModal: () => void
  closeLoginModal: () => void
  optimizationMode: boolean
  setOptimizationMode: (on: boolean) => void
}

const DemoContext = createContext<DemoContextValue>({
  model: 'auth',
  setModel: () => {},
  loginModalOpen: false,
  openLoginModal: () => {},
  closeLoginModal: () => {},
  optimizationMode: false,
  setOptimizationMode: () => {},
})

export function DemoProvider({ children }: { children: ReactNode }) {
  const [model, setModel] = useState<DemoModel>('auth')
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [optimizationMode, setOptimizationMode] = useState(false)

  return (
    <DemoContext.Provider value={{
      model,
      setModel,
      loginModalOpen,
      openLoginModal: () => setLoginModalOpen(true),
      closeLoginModal: () => setLoginModalOpen(false),
      optimizationMode,
      setOptimizationMode,
    }}>
      {children}
    </DemoContext.Provider>
  )
}

export function useDemo() {
  return useContext(DemoContext)
}
