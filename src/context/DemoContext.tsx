import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

export type DemoModel = 'auth' | 'A' | 'B'

interface DemoContextValue {
  model: DemoModel
  setModel: (m: DemoModel) => void
}

const DemoContext = createContext<DemoContextValue>({
  model: 'auth',
  setModel: () => {},
})

export function DemoProvider({ children }: { children: ReactNode }) {
  const [model, setModel] = useState<DemoModel>('auth')
  return (
    <DemoContext.Provider value={{ model, setModel }}>
      {children}
    </DemoContext.Provider>
  )
}

export function useDemo() {
  return useContext(DemoContext)
}
