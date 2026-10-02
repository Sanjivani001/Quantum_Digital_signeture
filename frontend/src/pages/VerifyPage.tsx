import { motion } from 'framer-motion'
import { CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { verifyMessage } from '../services/api'
import type { VerificationResponse } from '../types'

const verificationSteps = [
  'Reading signature',
  'Hashing message',
  'Reconstructing verification data',
  'Running quantum simulation',
  'Analyzing result',
  'Final decision'
]

export function VerifyPage() {
  const [message, setMessage] = useState('Transfer approved for ₹10,000')
  const [signatureId, setSignatureId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<VerificationResponse | null>(null)

  const handleSubmit = async () => {
    if (!message.trim() || !signatureId.trim()) {
      setError('Both the message and signature ID are required.')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const data = await verifyMessage(message, signatureId)
      setResult(data)
      localStorage.setItem('qsf_latest_verification', JSON.stringify(data))
    } catch (apiError) {
      setError(apiError instanceof Error ? apiError.message : 'Verification failed.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-panel">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Verify</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Validate a message against a stored signature.</h1>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-200" htmlFor="verify-message">Message</label>
            <textarea
              id="verify-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={6}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-base text-white outline-none focus:border-cyan-400/50"
              aria-label="Message to verify"
            />

            <label className="block text-sm font-medium text-slate-200" htmlFor="signature-id">Signature ID</label>
            <input
              id="signature-id"
              value={signatureId}
              onChange={(event) => setSignatureId(event.target.value)}
              placeholder="QSF-..."
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-base text-white outline-none focus:border-cyan-400/50"
              aria-label="Signature ID"
            />

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="inline-flex items-center justify-center rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? 'Verifying signature...' : 'Verify Signature'}
            </button>
            {error && <p className="text-sm text-rose-300">{error}</p>}
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
            <div className="text-sm uppercase tracking-[0.22em] text-slate-400">Verification flow</div>
            <div className="mt-5 space-y-4">
              {verificationSteps.map((step, index) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/10 text-xs font-medium text-cyan-300">
                    {index + 1}
                  </div>
                  <span className="text-slate-200">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {result && (
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-3xl border p-6 ${result.valid ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-rose-500/20 bg-rose-500/5'}`}
        >
          <div className="flex items-center gap-3">
            {result.valid ? <CheckCircle2 size={30} className="text-emerald-300" /> : <ShieldAlert size={30} className="text-rose-300" />}
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-300">Decision</p>
              <h2 className={`mt-2 text-4xl font-semibold ${result.valid ? 'text-emerald-300' : 'text-rose-300'}`}>
                {result.valid ? '✓ SIGNATURE VALID' : '✕ SIGNATURE INVALID'}
              </h2>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Verification Score</div>
              <div className="mt-3 text-2xl font-semibold text-white">{result.verification_score}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Threshold</div>
              <div className="mt-3 text-2xl font-semibold text-white">{result.threshold}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Message Integrity</div>
              <div className="mt-3 text-2xl font-semibold text-white">{result.message_integrity ? 'PASS' : 'FAIL'}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Reason</div>
              <div className="mt-3 text-sm text-slate-200">{result.reason}</div>
            </div>
          </div>
        </motion.section>
      )}

      {!result && !error && (
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 text-slate-300">
          <div className="flex items-center gap-3 text-cyan-300">
            <Sparkles size={18} />
            <span className="text-sm uppercase tracking-[0.22em]">Awaiting verification</span>
          </div>
          <p className="mt-3">Use the backend results, not assumptions, to evaluate whether the signature is valid.</p>
        </div>
      )}
    </div>
  )
}
