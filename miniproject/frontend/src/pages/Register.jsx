import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { UserPlus } from 'lucide-react'
import { motion } from 'framer-motion'
import Background3D from '../components/Background3D'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    const result = await register(email, password, name)
    
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
            <UserPlus className="w-8 h-8 text-blue-400" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-wide neon-text">ANTIGRAVITY</h1>
          <p className="text-gray-400 text-sm tracking-widest uppercase">System Registration</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-900/40 border border-red-500/50 text-red-200 rounded-lg text-sm text-center backdrop-blur-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">
              Operative Designation (Name)
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg glass-input text-white"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">
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
            <label htmlFor="password" className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">
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

          <div>
            <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">
              Verify Access Code
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            className="w-full mt-4 bg-blue-600/80 hover:bg-blue-500 text-white py-3 rounded-lg font-bold tracking-widest uppercase transition-all duration-300 neon-glow border border-blue-400/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Register'}
          </motion.button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-gray-400 text-sm">
            Already authorized?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
              Access System
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Register

