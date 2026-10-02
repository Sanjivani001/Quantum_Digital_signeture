import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'

export interface QuantumCircuitAnimationProps {
  isActive?: boolean
  animated?: boolean
  compact?: boolean
  measurementData?: Array<{ label: string; value: number }>
}

const defaultMeasurementData = [
  { label: '00', value: 72 },
  { label: '01', value: 54 },
  { label: '10', value: 42 },
  { label: '11', value: 28 }
]

export function QuantumCircuitAnimation({
  isActive = true,
  animated = true,
  compact = false,
  measurementData = defaultMeasurementData
}: QuantumCircuitAnimationProps) {
  const reduceMotion = useReducedMotion()
  const [tooltip, setTooltip] = useState<string | null>(null)

  const active = isActive && animated && !reduceMotion
  const bars = measurementData.length ? measurementData : defaultMeasurementData

  const gateTooltip = (label: string) => {
    const map: Record<string, string> = {
      q0: 'Qubit — the basic unit of quantum information.',
      q1: 'Qubit — the basic unit of quantum information.',
      H: 'Hadamard gate — creates a superposition from a computational basis state.',
      CNOT: 'Controlled-X gate — applies an X operation to the target when the control condition is met.',
      M: 'Measurement — reads the quantum state and produces a classical result.'
    }

    return map[label] ?? ''
  }

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-3">
      <div className="mb-3 flex items-center justify-between gap-2 text-[9px] uppercase tracking-[0.24em] text-slate-400">
        <span>INPUT</span>
        <span className="text-cyan-300">QUANTUM CIRCUIT</span>
        <span>MEASUREMENT</span>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-2">
        <svg viewBox={compact ? '0 0 420 190' : '0 0 480 220'} className="h-[180px] w-full md:h-[210px]" role="img" aria-label="Quantum circuit diagram">
          <defs>
            <linearGradient id="wireGradient" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#67e8f9" />
            </linearGradient>
            <linearGradient id="measureGlow" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#67e8f9" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          <g opacity="0.18">
            {[20, 60, 100, 140, 180, 220, 260, 300, 340, 380, 420, 460].map((x) => (
              <line key={x} x1={x} y1={20} x2={x} y2={170} stroke="#94a3b8" strokeWidth="0.5" />
            ))}
          </g>

          <g>
            <motion.path
              d="M 30 58 H 120"
              fill="none"
              stroke="url(#wireGradient)"
              strokeWidth="1.8"
              initial={active ? { pathLength: 0, opacity: 0.2 } : { pathLength: 1, opacity: 0.8 }}
              animate={active ? { pathLength: [0, 1, 1], opacity: [0.2, 0.9, 0.8] } : { pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 2.8, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.4 }}
            />
            <motion.path
              d="M 30 126 H 120"
              fill="none"
              stroke="url(#wireGradient)"
              strokeWidth="1.8"
              initial={active ? { pathLength: 0, opacity: 0.2 } : { pathLength: 1, opacity: 0.8 }}
              animate={active ? { pathLength: [0, 1, 1], opacity: [0.2, 0.9, 0.8] } : { pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 2.8, delay: 0.25, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.4 }}
            />

            <motion.g
              whileHover={{ scale: 1.04 }}
              onMouseEnter={() => setTooltip('H')}
              onMouseLeave={() => setTooltip(null)}
              onClick={() => setTooltip((current) => (current === 'H' ? null : 'H'))}
              style={{ cursor: 'pointer' }}
            >
              <motion.rect
                x="118"
                y="42"
                width="38"
                height="32"
                rx="8"
                fill="rgba(15, 23, 42, 0.9)"
                stroke={tooltip === 'H' ? '#67e8f9' : '#94a3b8'}
                strokeWidth={tooltip === 'H' ? 1.6 : 1.1}
                animate={active ? { scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] } : { opacity: 0.9 }}
                transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.9 }}
              />
              <text x="137" y="62" fontSize="12" textAnchor="middle" fill="#f8fafc" fontWeight="700">H</text>
            </motion.g>

            <motion.path
              d="M 156 58 H 240"
              fill="none"
              stroke="#8ec9ff"
              strokeWidth="1.5"
              strokeDasharray="6 10"
              initial={active ? { opacity: 0.3 } : { opacity: 0.8 }}
              animate={active ? { opacity: [0.25, 1, 0.25] } : { opacity: 0.8 }}
              transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.2 }}
            />
            <motion.path
              d="M 156 126 H 240"
              fill="none"
              stroke="#8ec9ff"
              strokeWidth="1.5"
              strokeDasharray="6 10"
              initial={active ? { opacity: 0.3 } : { opacity: 0.8 }}
              animate={active ? { opacity: [0.25, 1, 0.25] } : { opacity: 0.8 }}
              transition={{ duration: 2.4, delay: 0.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.2 }}
            />

            <motion.g
              onMouseEnter={() => setTooltip('CNOT')}
              onMouseLeave={() => setTooltip(null)}
              onClick={() => setTooltip((current) => (current === 'CNOT' ? null : 'CNOT'))}
              style={{ cursor: 'pointer' }}
            >
              <motion.circle
                cx="206"
                cy="58"
                r="6"
                fill={tooltip === 'CNOT' ? '#67e8f9' : '#dbeafe'}
                stroke="#67e8f9"
                strokeWidth="1.2"
                animate={active ? { scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] } : { opacity: 0.9 }}
                transition={{ duration: 2.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1 }}
              />
              <motion.path
                d="M 206 58 V 126"
                fill="none"
                stroke={tooltip === 'CNOT' ? '#67e8f9' : '#dbeafe'}
                strokeWidth="1.8"
                animate={active ? { opacity: [0.4, 1, 0.4] } : { opacity: 0.8 }}
                transition={{ duration: 2.1, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.2 }}
              />
              <motion.circle
                cx="206"
                cy="126"
                r="6"
                fill={tooltip === 'CNOT' ? '#67e8f9' : '#dbeafe'}
                stroke="#67e8f9"
                strokeWidth="1.2"
                animate={active ? { scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] } : { opacity: 0.9 }}
                transition={{ duration: 2.2, delay: 0.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1 }}
              />
              <text x="206" y="130" textAnchor="middle" fontSize="11" fill="#f8fafc" fontWeight="700">X</text>
            </motion.g>

            <motion.path
              d="M 240 58 H 290 M 240 126 H 290"
              fill="none"
              stroke="#8ec9ff"
              strokeWidth="1.5"
              initial={active ? { opacity: 0.25 } : { opacity: 0.8 }}
              animate={active ? { opacity: [0.2, 1, 0.2] } : { opacity: 0.8 }}
              transition={{ duration: 2.4, delay: 0.6, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.2 }}
            />

            <g>
              {[
                { x: 320, y: 58, label: 'M' },
                { x: 370, y: 126, label: 'M' }
              ].map((m, index) => (
                <motion.g
                  key={m.label + index}
                  onMouseEnter={() => setTooltip('M')}
                  onMouseLeave={() => setTooltip(null)}
                  onClick={() => setTooltip((current) => (current === 'M' ? null : 'M'))}
                  style={{ cursor: 'pointer' }}
                >
                  <motion.rect
                    x={m.x - 14}
                    y={m.y - 18}
                    width="28"
                    height="28"
                    rx="8"
                    fill="rgba(15, 23, 42, 0.86)"
                    stroke={tooltip === 'M' ? '#67e8f9' : '#cbd5e1'}
                    strokeWidth={tooltip === 'M' ? 1.5 : 1.1}
                    animate={active ? { opacity: [0.5, 1, 0.8] } : { opacity: 0.9 }}
                    transition={{ duration: 2.3, delay: 0.7 + index * 0.25, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.4 }}
                  />
                  <text x={m.x} y={m.y + 4} textAnchor="middle" fontSize="11" fill="#f8fafc" fontWeight="700">{m.label}</text>
                </motion.g>
              ))}
            </g>

            <motion.circle
              cx="38"
              cy="58"
              r="4"
              fill="#67e8f9"
              initial={{ opacity: 0.2 }}
              animate={active ? { x: [0, 65, 84, 145, 205], opacity: [0.2, 1, 1, 0.8, 0.2] } : { x: 0, opacity: 0.2 }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.circle
              cx="38"
              cy="126"
              r="4"
              fill="#67e8f9"
              initial={{ opacity: 0.2 }}
              animate={active ? { x: [0, 75, 112, 150, 230], opacity: [0.2, 1, 1, 0.8, 0.2] } : { x: 0, opacity: 0.2 }}
              transition={{ duration: 4.8, delay: 0.4, repeat: Infinity, ease: 'easeInOut' }}
            />

            <g>
              <text x="54" y="28" fontSize="9" fill="#cbd5e1" letterSpacing="1.6">q₀</text>
              <text x="54" y="150" fontSize="9" fill="#cbd5e1" letterSpacing="1.6">q₁</text>
            </g>
          </g>
        </svg>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.24em] text-cyan-300">
        <span>Prepare</span>
        <span className="text-slate-500">→</span>
        <span>Process</span>
        <span className="text-slate-500">→</span>
        <span>Measure</span>
      </div>

      <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/60 p-2">
        <div className="mb-2 text-[9px] uppercase tracking-[0.28em] text-slate-400">MEASUREMENT RESULT</div>
        <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-200 sm:grid-cols-4">
          {bars.map((item) => (
            <div key={item.label} className="rounded-lg border border-slate-700 bg-slate-950/80 p-1.5">
              <div className="mb-1 text-center font-medium text-white">{item.label}</div>
              <div className="flex h-8 items-end gap-1">
                {[...Array(10)].map((_, index) => (
                  <motion.div
                    key={`${item.label}-${index}`}
                    className="flex-1 rounded-t-sm bg-gradient-to-t from-cyan-500/75 to-cyan-300"
                    initial={{ height: 0, opacity: 0.2 }}
                    animate={active ? { height: `${Math.max(12, (item.value / 80) * 100)}%`, opacity: [0.4, 1, 0.85] } : { height: `${Math.max(12, (item.value / 80) * 100)}%`, opacity: 0.8 }}
                    transition={{ duration: 0.6, delay: index * 0.06, repeat: active ? Infinity : 0, repeatType: 'reverse', ease: 'easeOut' }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {tooltip && (
        <div className="mt-3 rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-2 py-1 text-[10px] leading-5 text-cyan-100">
          {gateTooltip(tooltip)}
        </div>
      )}

      <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/60 p-2">
        <button
          type="button"
          onClick={() => setTooltip((current) => (current === 'state' ? null : 'state'))}
          className="w-full text-left text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-300"
        >
          What is a quantum state?
        </button>
        {tooltip === 'state' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 space-y-2 overflow-hidden text-xs leading-5 text-slate-300"
          >
            <p>A quantum state is the mathematical description of a quantum system.</p>
            <p>
              For a single qubit, it can be represented as: |ψ⟩ = α|0⟩ + β|1⟩
            </p>
            <p>
              The amplitudes α and β determine the probability of measuring 0 or 1.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
