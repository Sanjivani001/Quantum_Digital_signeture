import { motion } from 'framer-motion'
import { BookOpen, ChevronDown, Cpu, Lock, Sparkles } from 'lucide-react'
import { useState } from 'react'

const concepts = [
  {
    title: 'Cryptographic Hashing',
    summary: 'A hash converts data into a compact and deterministic fingerprint used for integrity checks.',
    technical: 'In this prototype, the SHA-256 algorithm compresses the normalized message into a fixed-length digest before the quantum-state simulation is prepared.'
  },
  {
    title: 'Digital Signatures',
    summary: 'Digital signatures help confirm authenticity and integrity without needing to trust the message channel alone.',
    technical: 'A message may be hashed, signed, and then verified by recomputing the digest and confirming that the associated signature metadata remains consistent.'
  },
  {
    title: 'Public/Private Keys',
    summary: 'Key pairs are foundational in traditional signing models, where ownership is proven by a private key and checked by a public one.',
    technical: 'This prototype does not implement an asymmetric key scheme. It focuses on a simulator-driven digest and state-preparation workflow for educational demonstration.'
  },
  {
    title: 'Qubits',
    summary: 'Qubits are quantum bits that can exist in superposed states beyond the binary 0 and 1 model.',
    technical: 'The simulator uses a small two-qubit state space as a research-oriented abstraction rather than a claim that it is a production QDS implementation.'
  },
  {
    title: 'Quantum States',
    summary: 'A quantum state describes the configuration of a system before measurement.',
    technical: 'The state here is derived from deterministic hash bits and encoded into a state-preparation circuit to generate measurable outcomes.'
  },
  {
    title: 'Superposition',
    summary: 'Superposition allows a quantum system to be expressed as a combination of basis states before measurement.',
    technical: 'This concept is part of the research framing behind the simulator, but the prototype does not claim a complete quantum security architecture.'
  },
  {
    title: 'Entanglement',
    summary: 'Entanglement links quantum states across qubits in ways that can affect correlated measurement outcomes.',
    technical: 'In this prototype, entanglement is represented through circuit-building patterns and simulation behavior, not through a formally specified secure protocol.'
  },
  {
    title: 'Quantum Measurement',
    summary: 'Measurement collapses a quantum state into classical outcomes that can be counted and analyzed statistically.',
    technical: 'The backend uses measurement counts and empirical probabilities as part of the verification signal, which is why the lab visualizes actual measurement statistics.'
  },
  {
    title: 'Quantum Circuits',
    summary: 'Quantum circuits describe the gate operations applied to qubits before measurement.',
    technical: 'The generated circuit includes gate operations and depth metadata derived from the hash-based state preparation process used by the simulator.'
  },
  {
    title: 'Statistical Verification',
    summary: 'Verification can compare observed and expected statistical behavior to assess whether a signature remains consistent.',
    technical: 'This prototype calculates a similarity score across outcomes and compares it to the backend threshold; it is not proof of a formally secure protocol.'
  }
]

export function LearnPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-panel">
        <div className="flex items-center gap-3 text-cyan-300">
          <BookOpen size={22} />
          <p className="text-sm uppercase tracking-[0.24em]">Learn</p>
        </div>
        <h1 className="mt-3 text-4xl font-semibold text-white">Explore the concepts behind signatures, hashing and quantum-state simulation.</h1>
      </section>

      <div className="space-y-4">
        {concepts.map((concept, index) => {
          const isOpen = openIndex === index
          return (
            <motion.div
              key={concept.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="rounded-2xl border border-white/10 bg-slate-900/70"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  {index % 3 === 0 ? <Lock size={18} className="text-cyan-300" /> : index % 3 === 1 ? <Sparkles size={18} className="text-violet-300" /> : <Cpu size={18} className="text-emerald-300" />}
                  <span className="text-xl font-medium text-white">{concept.title}</span>
                </div>
                <ChevronDown size={18} className={`text-slate-400 transition ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className="border-t border-white/10 px-5 py-5 text-slate-300">
                  <p>{concept.summary}</p>
                  <div className="mt-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
                    <div className="mb-2 text-xs uppercase tracking-[0.2em] text-cyan-300">Technical View</div>
                    <p>{concept.technical}</p>
                  </div>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
