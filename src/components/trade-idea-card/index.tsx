import type { TradeIdea } from "@/types/trade"
import { AssetHeader } from "./asset-header"
import { TradeTags } from "./trade-tags"
import { PriceDisplay } from "./price-display"
import { DistanceBar } from "./distance-bar"
import { MiniChart } from "./mini-chart"
import { PotentialReturn } from "./potential-return"
import { BuyButton } from "./buy-button"
import { TrustBadges } from "./trust-badges"

interface TradeIdeaCardProps {
  trade: TradeIdea
}

export function TradeIdeaCard({ trade }: TradeIdeaCardProps) {
  return (
    <div className="w-full max-w-[420px] bg-surface-card rounded-[24px] glass-border shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="p-gutter pb-4">
        <AssetHeader asset={trade.asset} isLive={trade.isLive} />

        <h1 className="font-sans font-semibold text-white text-2xl leading-tight mb-6">
          {trade.question}
        </h1>

        <TradeTags
          direction={trade.direction}
          expiresAt={trade.expiresAt}
          optionType={trade.optionType}
        />

        <PriceDisplay
          currentPrice={trade.currentPrice}
          priceChangePct={trade.priceChangePct}
        />

        <DistanceBar
          distancePercent={trade.distancePercent}
          progressPercent={trade.progressPercent}
        />
      </div>

      {/* Chart */}
      <MiniChart
        data={trade.chartData}
        targetPrice={trade.targetPrice}
      />

      {/* Footer */}
      <div className="p-gutter pt-6">
        <PotentialReturn
          defaultStake={trade.defaultStake}
          potentialPayout={trade.potentialPayout}
          riskReward={trade.riskReward}
        />

        <BuyButton direction={trade.direction} />
        <TrustBadges />
      </div>
    </div>
  )
}
