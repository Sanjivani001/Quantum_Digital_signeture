import { motion, useReducedMotion } from 'framer-motion'
import { QuantumCircuitAnimation } from './QuantumCircuitAnimation'

const processStages = [
  {
    number: '01',
    title: 'MESSAGE',
    detail: 'Original message enters the system for hashing and validation.',
    type: 'message'
  },
  {
    number: '02',
    title: 'HASH',
    detail: 'A deterministic hash locks the payload into a stable representation.',
    type: 'hash'
  },
  {
    number: '03',
    title: 'QUANTUM PROCESSING',
    detail: 'Process the message-derived data through a quantum circuit and measure the resulting states.',
    type: 'quantum'
  },
  {
    number: '04',
    title: 'SIGNATURE',
    detail: 'Signature metadata is produced from the validated processing state.',
    type: 'signature'
  },
  {
    number: '05',
    title: 'VERIFY',
    detail: 'Verification scans the signal to confirm integrity and authenticity.',
    type: 'verify'
  }
]

function StageArrow() {
  return (
    <div className="relative flex h-10 w-full items-center justify-center">
      <div className="h-8 w-px bg-slate-600" />
      <motion.div
        className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.9)]"
        animate={{ y: [-6, 12, -6], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute bottom-1 left-1/2 h-0 w-0 -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-cyan-300/80" />
    </div>
  )
}

export function QuantumGuardianHero() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
      animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="guardian-panel relative w-full overflow-hidden rounded-[28px] border border-slate-800 bg-slate-950/80 p-3 sm:p-4 lg:p-5"
    >
      <svg aria-hidden="true" viewBox="0 0 700 260" className="pointer-events-none absolute inset-0 h-full w-full opacity-40">
        <path d="M 30 160 C 100 90, 140 50, 220 60 C 290 70, 330 120, 390 110 C 470 96, 520 40, 640 70" fill="none" stroke="rgba(148,163,184,0.26)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 40 180 C 120 210, 170 220, 250 200 C 320 180, 365 160, 440 170 C 515 180, 565 220, 644 196" fill="none" stroke="rgba(103,232,249,0.18)" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="4 10" />
      </svg>

      <div className="quantum-grid absolute inset-0 opacity-80" />
      <div className="absolute inset-x-10 top-3 h-24 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute bottom-8 right-16 h-20 w-20 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-[680px]">
        <div className="flex flex-col gap-3 sm:gap-4">
          {processStages.map((stage, index) => (
            <motion.div
              key={stage.title}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: index * 0.12, duration: 0.45, ease: 'easeOut' }}
              className="w-full"
            >
              <div className="rounded-[22px] border border-slate-700 bg-slate-950/75 p-3 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.9)] sm:p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-[10px] font-medium uppercase tracking-[0.24em] text-slate-400">{stage.number}</div>
                  <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 text-[9px] font-medium uppercase tracking-[0.18em] text-cyan-200">
                    {stage.title === 'VERIFY' ? '✓' : stage.title === 'MESSAGE' ? 'M' : stage.title === 'HASH' ? 'H' : stage.title === 'SIGNATURE' ? 'S' : 'Q'}
                  </div>
                </div>

                <div className="mt-3 text-base font-semibold uppercase tracking-[0.18em] text-white sm:text-lg">{stage.title}</div>
                <p className="mt-2 text-sm leading-6 text-slate-300">{stage.detail}</p>

                {stage.type === 'quantum' ? (
                  <div className="mt-4 rounded-2xl border border-cyan-500/20 bg-slate-900/80 p-3 sm:p-4">
                    <QuantumCircuitAnimation isActive animated />
                  </div>
                ) : stage.type === 'signature' ? (
                  <div className="mt-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-3">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-amber-300">QSF-v0.1</div>
                    <div className="mt-2 text-base font-semibold text-white">Signature Generated</div>
                  </div>
                ) : stage.type === 'verify' ? (
                  <div className="mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-3">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-emerald-300">SCANNING...</div>
                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-800">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-emerald-300"
                        initial={reduceMotion ? false : { width: '0%' }}
                        animate={reduceMotion ? undefined : { width: '100%' }}
                        transition={{ delay: 0.4, duration: 0.9, ease: 'easeInOut' }}
                      />
                    </div>
                    <div className="mt-2 text-base font-semibold text-emerald-300">✓ VERIFIED</div>
                  </div>
                ) : null}
              </div>

              {index < processStages.length - 1 && <StageArrow />}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
