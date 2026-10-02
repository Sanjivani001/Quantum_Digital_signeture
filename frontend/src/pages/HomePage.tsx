import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Lock, ShieldAlert, ShieldCheck, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { QuantumGuardianHero } from '../components/QuantumGuardianHero'
import { signMessage, verifyMessage } from '../services/api'

const flowStages = [
  { label: 'MESSAGE', detail: 'The original message is prepared for hashing and verification.' },
  { label: 'HASH', detail: 'A deterministic hash condenses the message into a fixed signature payload.' },
  { label: 'SIGNING', detail: 'The signing process binds the hash to the quantum state representation.' },
  { label: 'DIGITAL SIGNATURE', detail: 'The signature and metadata are stored for later validation.' },
  { label: 'VERIFICATION', detail: 'A verification pulse checks the message against the expected signature result.' },
  { label: '✓ TRUSTED', detail: 'When the signal matches, the system confirms integrity and authenticity.' }
]

const signalCards = [
  'Experimental',
  'Research prototype',
  'Quantum-inspired',
  'Cybersecurity',
  'Detection',
  'Protection'
]

export function HomePage() {
  const reduceMotion = useReducedMotion()
  const navigate = useNavigate()
  const [activeStage, setActiveStage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ valid: boolean; reason: string; signatureId?: string } | null>(null)

  const runDemo = async () => {
    setLoading(true)
    try {
      const original = 'Transfer approved for ₹10,000'
      const modified = 'Transfer approved for ₹50,000'
      const signed = await signMessage(original)
      const verified = await verifyMessage(modified, signed.signature_id)
      setResult({
        valid: verified.valid,
        reason: verified.reason,
        signatureId: signed.signature_id
      })
    } catch (error) {
      setResult({
        valid: false,
        reason: error instanceof Error ? error.message : 'The backend verification request failed.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 pb-8">
      <motion.section
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="guardian-panel relative overflow-hidden rounded-[32px] border border-slate-800 bg-slate-950/70 p-4 sm:p-5 lg:p-6"
      >
        <div className="quantum-grid absolute inset-0 opacity-70" />
        <div className="relative z-10 grid items-start gap-5 min-[1200px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="flex flex-col pl-0 sm:pl-1">
            <div className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.3em] text-cyan-300">
              QSF-v0.1 • research prototype
            </div>
            <h1 className="mt-5 text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[0.96] tracking-[-0.07em] text-white">
              QUANTUM
              <span className="mt-2 block text-cyan-300">SIGNATURE</span>
              <span className="mt-2 block text-slate-100">FRAMEWORK</span>
            </h1>
            <p className="mt-5 max-w-lg text-base text-slate-300 sm:text-lg">
              Where cryptography meets quantum information.
            </p>
            <p className="mt-3 max-w-md text-sm text-slate-400 sm:text-base">Create. Verify. Detect tampering.</p>

            <div className="mt-7 flex w-full max-w-md flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => navigate('/create')}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-500/12 px-4 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-500/15"
              >
                CREATE SIGNATURE <ArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={() => navigate('/learn')}
                className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:text-white"
              >
                EXPLORE THE TECHNOLOGY
              </button>
            </div>
          </div>

          <div className="w-full min-w-0">
            <QuantumGuardianHero />
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={reduceMotion ? false : { opacity: 0, y: 22 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="rounded-[30px] border border-slate-800 bg-slate-900/70 p-5 sm:p-7"
      >
        <div className="max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.26em] text-cyan-300">How it works</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.06em] text-white sm:text-3xl">
            How does a digital signature work?
          </h2>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {flowStages.map((stage, index) => (
              <button
                key={stage.label}
                type="button"
                onClick={() => setActiveStage(index)}
                className={`stage-button rounded-2xl border p-4 text-left transition ${
                  activeStage === index
                    ? 'border-cyan-400/40 bg-cyan-500/10 text-white shadow-[0_0_0_1px_rgba(103,232,249,0.18)]'
                    : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-600'
                }`}
              >
                <div className="text-[10px] uppercase tracking-[0.2em] text-cyan-300">0{index + 1}</div>
                <div className="mt-3 text-lg font-medium text-white">{stage.label}</div>
              </button>
            ))}
          </div>

          <motion.div
            key={flowStages[activeStage].label}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="rounded-[24px] border border-slate-800 bg-slate-950/70 p-5"
          >
            <div className="text-[10px] uppercase tracking-[0.24em] text-cyan-300">Selected stage</div>
            <div className="mt-3 text-2xl font-semibold text-white">{flowStages[activeStage].label}</div>
            <p className="mt-4 text-base leading-7 text-slate-300">{flowStages[activeStage].detail}</p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="grid gap-6 lg:grid-cols-2"
      >
        <div className="rounded-[30px] border border-slate-800 bg-slate-900/60 p-5 sm:p-7">
          <p className="text-[11px] uppercase tracking-[0.26em] text-cyan-300">Classical process</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.06em] text-white">What happens when quantum information enters the picture?</h2>
          <div className="mt-6 space-y-3">
            {['MESSAGE', 'HASH', 'SIGNATURE'].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-800 bg-slate-950/60 px-3 py-3 text-sm uppercase tracking-[0.18em] text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[30px] border border-cyan-500/20 bg-cyan-500/5 p-5 sm:p-7">
          <p className="text-[11px] uppercase tracking-[0.26em] text-cyan-300">Quantum transformation</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.06em] text-white">Quantum state + measurement + verification</h2>
          <div className="mt-6 space-y-3">
            {['MESSAGE', 'HASH', 'QUANTUM PROCESSING', 'MEASUREMENT', 'VERIFICATION'].map((item) => (
              <div key={item} className="rounded-2xl border border-cyan-400/20 bg-slate-950/70 px-3 py-3 text-sm uppercase tracking-[0.18em] text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="rounded-[30px] border border-slate-800 bg-slate-900/70 p-5 sm:p-7"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.26em] text-cyan-300">Live demo</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.06em] text-white sm:text-3xl">
              Watch tampering get detected.
            </h2>
          </div>
          <button
            type="button"
            onClick={runDemo}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-xl border border-cyan-400/40 bg-cyan-500/12 px-4 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-500/15 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Generating signature...' : 'SIMULATE TAMPERING'}
          </button>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <div className="rounded-[24px] border border-slate-800 bg-slate-950/60 p-4">
            <div className="text-[10px] uppercase tracking-[0.24em] text-slate-400">Original message</div>
            <div className="mt-3 text-lg font-medium text-white">Transfer approved for ₹10,000</div>
          </div>
          <div className="rounded-[24px] border border-cyan-500/20 bg-cyan-500/5 p-4">
            <div className="text-[10px] uppercase tracking-[0.24em] text-cyan-300">Quantum signature</div>
            <div className="mt-3 break-all text-sm text-slate-200">{result?.signatureId ?? 'Not generated yet'}</div>
          </div>
          <div className="rounded-[24px] border border-slate-800 bg-slate-950/60 p-4">
            <div className="text-[10px] uppercase tracking-[0.24em] text-slate-400">Modified message</div>
            <div className="mt-3 text-lg font-medium text-white">Transfer approved for ₹50,000</div>
          </div>
        </div>

        <div className="mt-6 rounded-[24px] border border-slate-800 bg-slate-950/60 p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-slate-400">
            <span>Original</span>
            <ArrowRight size={14} className="text-cyan-300" />
            <span>Signature</span>
            <ArrowRight size={14} className="text-cyan-300" />
            <span>Modified</span>
            <ArrowRight size={14} className="text-cyan-300" />
            <span className={result?.valid ? 'text-emerald-300' : 'text-rose-300'}>Verification</span>
          </div>

          <div className="mt-5 flex items-center gap-3">
            {result ? (
              result.valid ? <ShieldCheck size={22} className="text-emerald-300" /> : <ShieldAlert size={22} className="text-rose-300" />
            ) : (
              <Sparkles size={22} className="text-slate-500" />
            )}
            <div className="text-lg font-medium text-white">
              {result ? (result.valid ? '✓ SIGNATURE VALID' : '✕ SIGNATURE INVALID') : 'Awaiting backend verification'}
            </div>
          </div>
          {result && <div className="mt-3 text-sm text-slate-300">{result.reason}</div>}
        </div>
      </motion.section>

      <motion.section
        initial={reduceMotion ? false : { opacity: 0, y: 22 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="rounded-[30px] border border-slate-800 bg-slate-900/60 p-5 sm:p-7"
      >
        <div className="flex items-center gap-3 text-cyan-300">
          <Lock size={18} />
          <span className="text-[11px] uppercase tracking-[0.26em]">Why it matters</span>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {signalCards.map((item) => (
            <div key={item} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm uppercase tracking-[0.18em] text-slate-200">
              {item}
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="rounded-[30px] border border-cyan-500/20 bg-cyan-500/5 p-6 text-center sm:p-8"
      >
        <p className="text-[11px] uppercase tracking-[0.26em] text-cyan-300">Try the framework</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.06em] text-white sm:text-3xl">
          Build the workflow from message to verification.
        </h2>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/create" className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-500/12 px-4 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-500/15">
            CREATE SIGNATURE <ArrowRight size={16} />
          </Link>
          <Link to="/verify" className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:text-white">
            VERIFY SIGNATURE
          </Link>
        </div>
      </motion.section>
    </div>
  )
}
