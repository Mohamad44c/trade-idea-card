"use client"

import { useMemo } from "react"
import { useBinanceTicker } from "@/hooks/use-binance-ticker"
import { TradeIdeaCard } from "@/components/trade-idea-card"
import type { TradeIdea } from "@/types/trade"

interface LiveTradeIdeaCardProps {
  /** Static trade definition — live price/chart data is merged on top */
  base: TradeIdea
}

export function LiveTradeIdeaCard({ base }: LiveTradeIdeaCardProps) {
  // Normalise to bare symbol (strip USDT suffix if present) before appending
  const baseSymbol = base.asset.symbol.replace(/USDT$/i, "")
  const ticker = useBinanceTicker(`${baseSymbol}USDT`)

  const trade = useMemo<TradeIdea>(() => {
    if (!ticker.isConnected || ticker.price === 0) return base

    const { price, priceChangePct, openPrice, chartData } = ticker

    const distancePercent = Math.max(
      0,
      ((base.targetPrice - price) / base.targetPrice) * 100,
    )

    // progress: how far price has moved from 24h open toward target
    const range = base.targetPrice - (openPrice || price)
    const moved = price - (openPrice || price)
    const progressPercent =
      range > 0 ? Math.min(100, Math.max(0, (moved / range) * 100)) : 0

    return {
      ...base,
      currentPrice: price,
      priceChangePct,
      distancePercent,
      progressPercent,
      chartData: chartData.length > 1 ? chartData : base.chartData,
      isLive: ticker.isConnected,
    }
  }, [base, ticker])

  return <TradeIdeaCard trade={trade} />
}
