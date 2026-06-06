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
    <div className="w-full max-w-[420px] max-h-[calc(100svh-14rem)] md:max-h-[calc(100svh-10rem)] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-surface-card rounded-[24px] glass-border shadow-2xl relative">
      {/* Header */}
      <div className="p-4 md:p-gutter pb-3 md:pb-4">
        <AssetHeader asset={trade.asset} isLive={trade.isLive} />

        <h1 className="font-sans font-semibold text-on-surface text-xl md:text-2xl leading-tight mb-3 md:mb-6">
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

      {/* Chart — explicit viewport-relative height avoids flex cascade issues */}
      <div style={{ height: "clamp(100px, 20svh, 180px)" }}>
        <MiniChart
          data={trade.chartData}
          targetPrice={trade.targetPrice}
        />
      </div>

      {/* Footer */}
      <div className="p-4 md:p-gutter pt-4 md:pt-6">
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
