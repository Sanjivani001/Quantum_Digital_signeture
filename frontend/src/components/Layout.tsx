import type { ReactNode } from 'react'
import { Navbar } from './Navbar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(103,232,249,0.10),_transparent_24%),radial-gradient(circle_at_right,_rgba(96,165,250,0.08),_transparent_22%)]" />
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  )
}
