import { MAX_STAT } from '../utils/pokemon'

type StatBarProps = {
  label: string
  value: number
}

function tier(value: number): string {
  if (value < 60) {
    return 'stat-low'
  }
  return value < 100 ? 'stat-medium' : 'stat-high'
}

export default function StatBar({ label, value }: StatBarProps) {
  return (
    <div className="grid grid-cols-[6.5rem_2.5rem_1fr] items-center gap-2 sm:grid-cols-[7.5rem_2.5rem_1fr]">
      <span className="text-xs font-semibold text-slate-700">{label}</span>
      <span className="font-mono text-sm font-bold tabular-nums text-slate-900">{value}</span>
      <span aria-hidden="true" className="stat-track">
        <span
          className={`stat-fill block ${tier(value)}`}
          style={{ width: `${Math.min(100, (value / MAX_STAT) * 100)}%` }}
        />
      </span>
    </div>
  )
}
