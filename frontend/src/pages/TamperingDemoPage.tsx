import { motion } from 'framer-motion'
import { ArrowRight, RefreshCcw, ShieldAlert } from 'lucide-react'
import { useState } from 'react'
import { signMessage, verifyMessage } from '../services/api'

const originalMessage = 'Transfer approved for ₹10,000'
const modifiedMessage = 'Transfer approved for ₹50,000'

export function TamperingDemoPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [signatureId, setSignatureId] = useState('')
  const [verification, setVerification] = useState<{ valid: boolean; reason: string } | null>(null)

  const runTamperingFlow = async () => {
    setIsLoading(true)
    try {
      const signed = await signMessage(originalMessage)
      setSignatureId(signed.signature_id)
      const verified = await verifyMessage(modifiedMessage, signed.signature_id)
      setVerification({ valid: verified.valid, reason: verified.reason })
    } catch (error) {
      setVerification({
        valid: false,
        reason: error instanceof Error ? error.message : 'The backend verification request failed.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const reset = () => {
    setSignatureId('')
    setVerification(null)
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-panel">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Tampering demo</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Original message to modified message via the real backend.</h1>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
          <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Original</div>
          <p className="mt-4 text-xl font-medium text-white">{originalMessage}</p>
        </div>
        <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-5">
          <div className="text-xs uppercase tracking-[0.2em] text-cyan-300">Quantum signature</div>
          <p className="mt-4 break-all text-sm text-white">{signatureId || 'Not generated yet'}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
          <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Modified</div>
          <p className="mt-4 text-xl font-medium text-white">{modifiedMessage}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <button
          type="button"
          onClick={runTamperingFlow}
          disabled={isLoading}
          className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? 'Simulating tampering...' : 'Simulate Tampering'}
        </button>
        <button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-white">
          <RefreshCcw size={16} /> Reset
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
        <div className="flex items-center justify-between gap-4 text-slate-300">
          <span>ORIGINAL</span>
          <ArrowRight size={18} className="text-cyan-300" />
          <span>SIGNATURE</span>
          <ArrowRight size={18} className="text-cyan-300" />
          <span>MESSAGE MODIFIED</span>
          <ArrowRight size={18} className="text-cyan-300" />
          <span>VERIFICATION</span>
          <ArrowRight size={18} className="text-cyan-300" />
          <span className={verification?.valid ? 'text-emerald-300' : 'text-rose-300'}>{verification ? (verification.valid ? '✓ VALID' : '✕ INVALID') : 'PENDING'}</span>
        </div>

        {verification && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
            <div className="flex items-center gap-3">
              <ShieldAlert size={22} className={verification.valid ? 'text-emerald-300' : 'text-rose-300'} />
              <span className="text-xl font-semibold text-white">{verification.valid ? 'VALID' : 'INVALID'}</span>
            </div>
            <p className="mt-3 text-slate-300">{verification.reason}</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
