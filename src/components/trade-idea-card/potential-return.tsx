import { TrendingUp } from "lucide-react"

interface PotentialReturnProps {
  defaultStake: number
  potentialPayout: number
  riskReward: string
}

export function PotentialReturn({
  defaultStake,
  potentialPayout,
  riskReward,
}: PotentialReturnProps) {
  return (
    <div className="bg-surface-container/50 rounded-xl p-4 glass-border mb-6 flex items-center justify-between">
      <div>
        <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">
          Potential Return
        </p>
        <p className="text-on-surface font-bold flex items-center gap-2">
          Your ${defaultStake} →{" "}
          <span className="text-bullish-green font-sans text-[32px] leading-8 tracking-tight font-medium">
            ${potentialPayout}
          </span>
          <TrendingUp className="w-4 h-4 text-bullish-green" />
        </p>
      </div>
      <div className="text-right">
        <p className="text-[10px] text-on-surface-variant font-medium">Risk/Reward</p>
        <p className="text-on-surface font-bold">{riskReward}</p>
      </div>
    </div>
  )
}
