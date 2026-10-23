import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import { Camera, Plus, LogOut, AlertCircle, Activity } from 'lucide-react'

const Dashboard = () => {
  const [cameras, setCameras] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newCamera, setNewCamera] = useState({ name: '', url: '', location: '' })
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetchCameras()
  }, [])

  const fetchCameras = async () => {
    try {
      const response = await api.get('/cameras')
      setCameras(response.data.cameras)
    } catch (error) {
      console.error('Failed to fetch cameras:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddCamera = async (e) => {
    e.preventDefault()
    try {
      await api.post('/cameras', newCamera)
      setShowAddModal(false)
      setNewCamera({ name: '', url: '', location: '' })
      fetchCameras()
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to add camera')
    }
  }

  const handleCameraClick = (cameraId) => {
    navigate(`/monitoring/${cameraId}`)
  }

  return (
    <div className="min-h-screen bg-black text-slate-300 font-sans selection:bg-blue-500/30 relative">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(14,35,68,0.4),rgba(0,0,0,1)_70%)] z-0" />
      
      {/* Header */}
      <header className="relative z-10 bg-black/50 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-900/30 border border-blue-500/30 flex items-center justify-center neon-glow">
                <Activity className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-widest text-white neon-text uppercase">Antigravity Core</h1>
                <p className="text-blue-400 text-xs tracking-wider uppercase">Operative: {user?.name || user?.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 bg-red-900/20 hover:bg-red-900/40 border border-red-500/30 text-red-400 rounded-lg transition-all shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] text-sm uppercase tracking-wider"
            >
              <LogOut className="w-4 h-4" />
              Disconnect
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white tracking-widest uppercase">Grid Feeds</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600/80 hover:bg-blue-500 text-white rounded-lg text-sm font-bold uppercase tracking-widest transition-all neon-glow border border-blue-400/50"
          >
            <Plus className="w-4 h-4" />
            Initialize Feed
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4 neon-glow" />
            <div className="text-blue-400 text-sm uppercase tracking-widest animate-pulse">Establishing Connection...</div>
          </div>
        ) : cameras.length === 0 ? (
          <div className="text-center py-20 glass-panel rounded-2xl max-w-2xl mx-auto border border-white/5">
            <Camera className="w-16 h-16 text-blue-500/50 mx-auto mb-6" />
            <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-widest">No Active Nodes</h3>
            <p className="text-slate-400 mb-8 text-sm">Deploy a camera node to begin area surveillance</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 hover:text-blue-300 border border-blue-500/30 rounded-lg text-sm font-bold tracking-widest transition-all uppercase"
            >
              Deploy Node
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cameras.map((camera) => (
              <div
                key={camera.id}
                onClick={() => handleCameraClick(camera.id)}
                className="group glass-panel rounded-xl p-6 cursor-pointer hover:bg-white-[0.02] transition-all duration-300 border border-white/5 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-900/20 border border-blue-500/20 group-hover:border-blue-400/50 rounded-lg flex items-center justify-center transition-colors">
                      <Camera className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-wider uppercase group-hover:text-blue-200 transition-colors">{camera.name}</h3>
                      <p className="text-slate-500 text-xs tracking-widest uppercase mt-1">LOC: {camera.location || 'UNKNOWN'}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center group-hover:border-blue-900/30 transition-colors">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
                    <span className="text-xs text-slate-400 tracking-wider">ONLINE</span>
                  </span>
                  <span className="text-blue-500/50 group-hover:text-blue-400 text-xs tracking-widest uppercase transition-colors">Access &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add Camera Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="glass-panel border-white/10 rounded-2xl shadow-2xl w-full max-w-md p-8">
            <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest border-b border-white/10 pb-4">Initialize Node</h2>
            <form onSubmit={handleAddCamera} className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                  Node Designation
                </label>
                <input
                  type="text"
                  value={newCamera.name}
                  onChange={(e) => setNewCamera({ ...newCamera, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 glass-input rounded-lg"
                  placeholder="Sector 7 Entrance"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                  Data Stream Vector
                </label>
                <input
                  type="text"
                  value={newCamera.url}
                  onChange={(e) => setNewCamera({ ...newCamera, url: e.target.value })}
                  required
                  className="w-full px-4 py-3 glass-input rounded-lg"
                  placeholder="0 or rtsp://..."
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                  Coordinates (Location)
                </label>
                <input
                  type="text"
                  value={newCamera.location}
                  onChange={(e) => setNewCamera({ ...newCamera, location: e.target.value })}
                  className="w-full px-4 py-3 glass-input rounded-lg"
                  placeholder="North Wing"
                />
              </div>
              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 border border-white/10 text-slate-400 rounded-lg hover:bg-white/5 transition-all text-sm uppercase tracking-wider font-bold"
                >
                  Abort
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-blue-600/80 hover:bg-blue-500/90 text-white border border-blue-400/50 rounded-lg font-bold transition-all text-sm uppercase tracking-wider neon-glow"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard

