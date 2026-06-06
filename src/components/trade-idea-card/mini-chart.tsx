"use client"

import { useId } from "react"
import type { ChartDataPoint } from "@/types/trade"

interface MiniChartProps {
  data: ChartDataPoint[]
  targetPrice: number
}

function buildPath(points: { x: number; y: number }[]): string {
  if (points.length < 2) return ""
  return points.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(" ")
}

export function MiniChart({ data, targetPrice }: MiniChartProps) {
  const gradientId = useId()

  const W = 400
  const H = 200
  const padT = 20
  const padB = 10

  if (data.length === 0) return null

  const values = data.map((d) => d.value)
  // Scale Y-axis to the data range only — including targetPrice would crush the
  // line when the target is far away (e.g. BTC at $60k with a $105k target).
  const minVal = Math.min(...values) * 0.999
  const maxVal = Math.max(...values) * 1.001

  const toX = (i: number) => (i / (data.length - 1)) * W
  const toY = (v: number) => padT + ((maxVal - v) / (maxVal - minVal)) * (H - padT - padB)

  const points = data.map((d) => ({ x: toX(d.index), y: toY(d.value) }))
  const linePath = buildPath(points)
  const areaPath = `M0,${H} ${linePath.replace(/^M/, "L")} L${W},${H} Z`

  // Clamp the strike line so it stays visible even when targetPrice is off-chart.
  // Near the top means the target is above current price (typical CALL scenario).
  const strikeYRaw = toY(targetPrice)
  const strikeY = Math.max(padT, Math.min(H - padB, strikeYRaw))
  const strikeAbove = strikeYRaw < padT
  const strikeBelow = strikeYRaw > H - padB

  const dotX = points[points.length - 1].x
  const dotY = points[points.length - 1].y

  return (
    <div className="relative h-full w-full overflow-hidden bg-surface-container-low/30">
      {/* Strike line — clamped to chart bounds; arrow hints when target is off-chart */}
      <div
        className="absolute left-0 w-full flex items-center z-10"
        style={{ top: `${(strikeY / H) * 100}%` }}
      >
        <div className="grow border-t-2 border-dashed border-on-surface-variant/40" />
        <div className="px-3 py-1 bg-surface-card border border-border-glass rounded-l-lg -mr-px flex items-center gap-1">
          {strikeAbove && <span className="text-[10px] text-on-surface-variant">↑</span>}
          {strikeBelow && <span className="text-[10px] text-on-surface-variant">↓</span>}
          <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">
            Strike ${(targetPrice / 1000).toFixed(0)}k
          </span>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" style={{ stopColor: "var(--color-bullish-green)", stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: "var(--color-bullish-green)", stopOpacity: 0 }} />
          </linearGradient>
        </defs>

        <path d={areaPath} fill={`url(#${gradientId})`} />
        <path d={linePath} fill="none" style={{ stroke: "var(--color-bullish-green)" }} strokeWidth="2.5" strokeLinejoin="round" />

        <circle cx={dotX} cy={dotY} r="5" style={{ fill: "var(--color-bullish-green)" }} />
        <circle cx={dotX} cy={dotY} r="10" fill="none" style={{ stroke: "var(--color-bullish-green)" }} strokeOpacity="0.5" strokeWidth="1">
          <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  )
}
