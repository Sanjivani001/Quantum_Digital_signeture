import { motion } from 'framer-motion'
import { BarChart3, CircuitBoard, Database, Cpu } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { SignatureResponse } from '../types'

export function QuantumLabPage() {
  const [signature, setSignature] = useState<SignatureResponse | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('qsf_latest_signature')
    if (!stored) return
    try {
      const parsed = JSON.parse(stored) as SignatureResponse
      setSignature(parsed)
    } catch {
      setSignature(null)
    }
  }, [])

  const chartData = useMemo(() => {
    if (!signature) return []
    return Object.entries(signature.quantum_signature.measurement_counts).map(([key, value]) => ({
      name: key,
      count: value
    }))
  }, [signature])

  const probabilityData = useMemo(() => {
    if (!signature) return []
    return Object.entries(signature.quantum_signature.probabilities).map(([key, value]) => ({
      name: key,
      probability: Number((value * 100).toFixed(2))
    }))
  }, [signature])

  if (!signature) {
    return (
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 text-slate-300">
        No live signature data is available yet. Generate a signature on the create page to populate the quantum lab.
      </div>
    )
  }

  const circuit = signature.quantum_signature.circuit_information

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
        <div className="flex items-center gap-3 text-cyan-300">
          <CircuitBoard size={22} />
          <p className="text-sm uppercase tracking-[0.24em]">Quantum Lab</p>
        </div>
        <h1 className="mt-3 text-4xl font-semibold text-white">Research dashboard using live backend payloads.</h1>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <div className="flex items-center gap-2 text-cyan-300">
            <Cpu size={18} />
            <span className="text-sm uppercase tracking-[0.2em]">Quantum Circuit</span>
          </div>
          <p className="mt-4 text-slate-200">{signature.quantum_signature.state_description}</p>
          <div className="mt-6 space-y-3">
            <div className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Gates</div>
              <div className="mt-2 text-white">{circuit.gates.join(', ') || 'No gates recorded'}</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Depth</div>
              <div className="mt-2 text-white">{circuit.depth}</div>
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <div className="flex items-center gap-2 text-cyan-300">
            <Database size={18} />
            <span className="text-sm uppercase tracking-[0.2em]">Circuit Metadata</span>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-slate-950/60 p-3"><div className="text-xs uppercase tracking-[0.2em] text-slate-400">Qubits</div><div className="mt-2 text-2xl font-semibold text-white">{circuit.qubits}</div></div>
            <div className="rounded-xl border border-white/10 bg-slate-950/60 p-3"><div className="text-xs uppercase tracking-[0.2em] text-slate-400">Classical bits</div><div className="mt-2 text-2xl font-semibold text-white">{circuit.classical_bits}</div></div>
            <div className="rounded-xl border border-white/10 bg-slate-950/60 p-3"><div className="text-xs uppercase tracking-[0.2em] text-slate-400">Gates</div><div className="mt-2 text-2xl font-semibold text-white">{circuit.gates.length}</div></div>
            <div className="rounded-xl border border-white/10 bg-slate-950/60 p-3"><div className="text-xs uppercase tracking-[0.2em] text-slate-400">Simulator</div><div className="mt-2 text-lg text-white">{circuit.simulator}</div></div>
          </div>
          <p className="mt-6 text-slate-300">These results are produced by the QSF-v0.1 simulator prototype.</p>
        </motion.section>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <div className="flex items-center gap-2 text-cyan-300">
            <BarChart3 size={18} />
            <span className="text-sm uppercase tracking-[0.2em]">Measurement Counts</span>
          </div>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis dataKey="name" stroke="#cbd5e1" />
                <YAxis stroke="#cbd5e1" />
                <Tooltip />
                <Bar dataKey="count" fill="#67e8f9" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <div className="flex items-center gap-2 text-cyan-300">
            <BarChart3 size={18} />
            <span className="text-sm uppercase tracking-[0.2em]">Probability Distribution</span>
          </div>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={probabilityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis dataKey="name" stroke="#cbd5e1" />
                <YAxis stroke="#cbd5e1" />
                <Tooltip formatter={(value) => [`${Number(value)}%`, 'Probability']} />
                <Bar dataKey="probability" fill="#a78bfa" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  )
}
