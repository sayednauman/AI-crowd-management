import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogIn } from 'lucide-react'
import { motion } from 'framer-motion'
import Background3D from '../components/Background3D'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await login(email, password)
    
    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.error)
    }
    
    setLoading(false)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-black">
      <Background3D />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 glass-panel rounded-2xl w-full max-w-md p-8"
      >
        <div className="text-center mb-8 relative">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 neon-glow border border-blue-500/50 bg-blue-900/30"
          >
            <LogIn className="w-8 h-8 text-blue-400" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-wide neon-text">ANTIGRAVITY</h1>
          <p className="text-gray-400 text-sm tracking-widest uppercase">Crowd Density Monitor</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-900/40 border border-red-500/50 text-red-200 rounded-lg text-sm text-center backdrop-blur-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
              Network ID (Email)
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg glass-input text-white"
              placeholder="agent@antigravity.net"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
              Access Code (Password)
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg glass-input text-white"
              placeholder="••••••••"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600/80 hover:bg-blue-500 text-white py-3 rounded-lg font-bold tracking-widest uppercase transition-all duration-300 neon-glow border border-blue-400/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Authenticating...' : 'Initialize'}
          </motion.button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-gray-400 text-sm">
            Unregistered personnel?{' '}
            <Link to="/register" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
              Request Access
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Login

