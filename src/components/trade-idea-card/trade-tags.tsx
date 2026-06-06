import { ArrowUp, ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"
import type { TradeDirection, OptionType } from "@/types/trade"

interface TradeTagsProps {
  direction: TradeDirection
  expiresAt: string
  optionType: OptionType
}

export function TradeTags({ direction, expiresAt, optionType }: TradeTagsProps) {
  const isBullish = direction === "CALL"

  return (
    <div className="flex flex-wrap gap-2 mb-4 md:mb-8">
      <span
        className={cn(
          "px-3 py-1 text-[11px] font-bold rounded-md glass-border flex items-center gap-1",
          isBullish
            ? "bg-bullish-green/10 text-bullish-green"
            : "bg-bearish-coral/10 text-bearish-coral",
        )}
      >
        {direction}
        {isBullish ? (
          <ArrowUp className="w-3 h-3" />
        ) : (
          <ArrowDown className="w-3 h-3" />
        )}
      </span>

      <span className="px-3 py-1 bg-surface-container text-on-surface text-[11px] font-medium rounded-md glass-border">
        Expires {expiresAt}
      </span>

      <span className="px-3 py-1 bg-surface-container text-on-surface text-[11px] font-medium rounded-md glass-border">
        {optionType}
      </span>
    </div>
  )
}
