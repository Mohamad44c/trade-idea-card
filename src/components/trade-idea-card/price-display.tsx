interface PriceDisplayProps {
  currentPrice: number
  priceChangePct: number
}

export function PriceDisplay({ currentPrice, priceChangePct }: PriceDisplayProps) {
  const isPositive = priceChangePct >= 0
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(currentPrice)

  return (
    <div className="flex items-baseline gap-3 mb-2">
      <span className="text-on-surface font-bold font-sans text-[32px] leading-10 tracking-tight">
        {formatted}
      </span>
      <span
        className={
          isPositive
            ? "px-2 py-0.5 bg-bullish-green/10 text-bullish-green text-xs font-bold rounded"
            : "px-2 py-0.5 bg-bearish-coral/10 text-bearish-coral text-xs font-bold rounded"
        }
      >
        {isPositive ? "+" : ""}
        {priceChangePct.toFixed(1)}%
      </span>
    </div>
  )
}
