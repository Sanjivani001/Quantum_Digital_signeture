import { motion } from 'framer-motion'
import { ArrowRight, Cpu, FlaskConical, ShieldAlert, Sparkles } from 'lucide-react'

const futureScope = [
  'formally specified QDS protocols',
  'real quantum hardware',
  'document/PDF signing',
  'stronger key management',
  'enterprise verification APIs',
  'larger-scale experimentation'
]

export function AboutPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-panel">
        <div className="flex items-center gap-3 text-cyan-300">
          <Sparkles size={22} />
          <p className="text-sm uppercase tracking-[0.24em]">About</p>
        </div>
        <h1 className="mt-3 text-4xl font-semibold text-white">Research-oriented digital-signature tooling for a quantum simulator workflow.</h1>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <div className="flex items-center gap-3 text-cyan-300">
            <Cpu size={20} />
            <span className="text-sm uppercase tracking-[0.2em]">Project objective</span>
          </div>
          <p className="mt-4 text-slate-300">QSF explores how digest-based verification can be connected to a quantum-state simulation framework so researchers and students can reason about the relationship between classical message integrity and quantum measurement-based signals.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <div className="flex items-center gap-3 text-cyan-300">
            <FlaskConical size={20} />
            <span className="text-sm uppercase tracking-[0.2em]">Architecture</span>
          </div>
          <p className="mt-4 text-slate-300">The system pairs a Python FastAPI backend with a React + TypeScript frontend. The backend hashes input messages, creates a deterministic quantum-state representation, stores the signature metadata, and verifies message integrity against the stored signature record.</p>
        </motion.div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Technology stack</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"><div className="text-xs uppercase tracking-[0.2em] text-slate-400">Frontend</div><div className="mt-2 text-lg text-white">React + Vite + TS</div></div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"><div className="text-xs uppercase tracking-[0.2em] text-slate-400">Styling</div><div className="mt-2 text-lg text-white">Tailwind CSS</div></div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"><div className="text-xs uppercase tracking-[0.2em] text-slate-400">Motion</div><div className="mt-2 text-lg text-white">Framer Motion</div></div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"><div className="text-xs uppercase tracking-[0.2em] text-slate-400">Backend</div><div className="mt-2 text-lg text-white">FastAPI + Python</div></div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Research motivation</p>
          <p className="mt-4 text-slate-300">The work aims to make the ideas behind hashing, state preparation, simulation and verification understandable to a wider audience while demonstrating the difference between a conceptual quantum-signature workflow and a formally standardized secure protocol.</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Current implementation</p>
          <p className="mt-4 text-slate-300">This version uses a deterministic SHA-256-derived qubit simulation profile and measurement statistics to illustrate a verification-style workflow in a research prototype.</p>
        </div>
      </div>

      <div className="rounded-3xl border border-amber-500/20 bg-amber-500/5 p-6">
        <div className="flex items-center gap-3 text-amber-300">
          <ShieldAlert size={22} />
          <span className="text-sm uppercase tracking-[0.24em]">Prototype limitations</span>
        </div>
        <p className="mt-4 text-slate-200">QSF-v0.1 is an educational/research prototype. It should not be interpreted as a formally proven secure Quantum Digital Signature protocol.</p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Future scope</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {futureScope.map((item) => (
            <div key={item} className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/60 p-3 text-slate-200">
              <ArrowRight size={16} className="text-cyan-300" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
