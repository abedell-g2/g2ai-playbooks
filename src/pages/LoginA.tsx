import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDemo } from '../context/DemoContext'

export default function LoginA() {
  const { setModel } = useDemo()
  const navigate = useNavigate()

  useEffect(() => {
    setModel('A')
    navigate('/', { replace: true })
  }, [setModel, navigate])

  return null
}
