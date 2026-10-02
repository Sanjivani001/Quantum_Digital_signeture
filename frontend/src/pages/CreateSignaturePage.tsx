import { motion } from 'framer-motion'
import { CheckCheck, Copy, Eye, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signMessage } from '../services/api'
import type { SignatureResponse } from '../types'

const loadingSteps = [
  'Reading message',
  'Calculating SHA-256',
  'Preparing quantum representation',
  'Running quantum simulator',
  'Collecting measurements',
  'Creating signature'
]

export function CreateSignaturePage() {
  const navigate = useNavigate()
  const [message, setMessage] = useState('Transfer approved for ₹10,000')
  const [result, setResult] = useState<SignatureResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleSubmit = async () => {
    if (!message.trim()) {
      setError('Please enter a message to sign.')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const data = await signMessage(message)
      setResult(data)
      localStorage.setItem('qsf_latest_signature', JSON.stringify(data))
      localStorage.setItem('qsf_latest_message', message)
    } catch (apiError) {
      setError(apiError instanceof Error ? apiError.message : 'Unable to generate a signature from the backend.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!result?.signature_id) return
    try {
      await navigator.clipboard.writeText(result.signature_id)
    } catch {
      setError('Unable to copy the signature ID in this browser.')
    }
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-panel">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Create signature</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Generate a real quantum signature from the backend.</h1>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-200" htmlFor="message">Enter a message to sign...</label>
            <textarea
              id="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={8}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-base text-white outline-none transition focus:border-cyan-400/50"
              aria-label="Message to sign"
            />
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="inline-flex items-center justify-center rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? 'Generating quantum signature...' : 'Generate Quantum Signature'}
            </button>
            {error && <p className="text-sm text-rose-300">{error}</p>}
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
            <div className="text-sm uppercase tracking-[0.22em] text-slate-400">Process</div>
            {isLoading ? (
              <div className="mt-5 space-y-4">
                {loadingSteps.map((step, index) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/10 text-xs font-medium text-cyan-300">
                      {index + 1}
                    </div>
                    <span className="text-slate-200">{step}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-5 space-y-4 text-slate-300">
                <p>Use the form to create a fresh signature payload from the live FastAPI backend.</p>
                <p>Once the request succeeds, the dashboard below shows the actual hash, circuit data and measurement results.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {result && (
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-6"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-emerald-300">Signature created</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Quantum signature ready</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={handleCopy} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                <Copy size={16} /> Copy Signature ID
              </button>
              <button type="button" onClick={() => navigate('/verify')} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                <ShieldCheck size={16} /> Verify This Message
              </button>
              <button type="button" onClick={() => setShowAdvanced((v) => !v)} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                <Eye size={16} /> View Quantum Details
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Signature ID</div>
              <div className="mt-3 break-all text-sm text-white">{result.signature_id}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Message Hash</div>
              <div className="mt-3 break-all text-sm text-white">{result.message_hash}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Protocol Version</div>
              <div className="mt-3 text-sm text-white">{result.protocol_version}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Created</div>
              <div className="mt-3 text-sm text-white">{new Date(result.creation_timestamp).toLocaleString()}</div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 xl:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Quantum state description</div>
              <p className="mt-3 text-slate-200">{result.quantum_signature.state_description}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Circuit information</div>
              <p className="mt-3 text-slate-200">
                {result.quantum_signature.circuit_information.gates.join(', ')} • depth {result.quantum_signature.circuit_information.depth}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <div className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-400">Measurement counts</div>
              <div className="space-y-2">
                {Object.entries(result.quantum_signature.measurement_counts).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-slate-200">
                    <span>{key}</span>
                    <span className="font-medium text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <div className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-400">Probability statistics</div>
              <div className="space-y-2">
                {Object.entries(result.quantum_signature.probabilities).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-slate-200">
                    <span>{key}</span>
                    <span className="font-medium text-white">{(value * 100).toFixed(2)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {showAdvanced && (
            <div className="mt-8 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <div className="mb-3 flex items-center gap-2 text-cyan-300">
                <CheckCheck size={18} />
                <span className="text-sm uppercase tracking-[0.2em]">Advanced Quantum Details</span>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-slate-900/70 p-3">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Qubits</div>
                  <div className="mt-2 text-lg text-white">{result.quantum_signature.circuit_information.qubits}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-slate-900/70 p-3">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Classical bits</div>
                  <div className="mt-2 text-lg text-white">{result.quantum_signature.circuit_information.classical_bits}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-slate-900/70 p-3">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Simulator</div>
                  <div className="mt-2 text-lg text-white">{result.quantum_signature.circuit_information.simulator}</div>
                </div>
              </div>
            </div>
          )}
        </motion.section>
      )}
    </div>
  )
}
