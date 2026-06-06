interface DistanceBarProps {
  distancePercent: number
  progressPercent: number
}

export function DistanceBar({ distancePercent, progressPercent }: DistanceBarProps) {
  const clamped = Math.min(100, Math.max(0, progressPercent))

  return (
    <div className="space-y-2 mt-4 md:mt-6">
      <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">
        <span>Distance</span>
        <span className="text-on-surface">{distancePercent.toFixed(1)}% away from target</span>
      </div>
      <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden p-px">
        <div
          className="h-full bg-bullish-green rounded-full shadow-[0_0_12px_rgba(0,255,136,0.5)] transition-all duration-500"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
