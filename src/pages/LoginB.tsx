import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDemo } from '../context/DemoContext'

export default function LoginB() {
  const { setModel } = useDemo()
  const navigate = useNavigate()

  useEffect(() => {
    setModel('B')
    navigate('/', { replace: true })
  }, [setModel, navigate])

  return null
}
