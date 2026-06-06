export type TradeDirection = "CALL" | "PUT"
export type OptionType = "Touch" | "No Touch" | "Barrier" | "Vanilla"

export interface TradeAsset {
  symbol: string
  name: string
  /** Hex brand color for the asset icon background, e.g. "#F7931A" for BTC */
  brandColor: string
  /** Optional path to a logo image in /public, e.g. "/icons/btc.svg" */
  logoUrl?: string
}

export interface ChartDataPoint {
  index: number
  value: number
}

export interface TradeIdea {
  id: string
  asset: TradeAsset
  /** Question framing the trade, e.g. "BTC above $105,000 in 7 days?" */
  question: string
  direction: TradeDirection
  optionType: OptionType
  /** Human-readable expiry string, e.g. "Jun 13, 2026" */
  expiresAt: string
  currentPrice: number
  /** Percentage change e.g. 2.4 means +2.4% */
  priceChangePct: number
  targetPrice: number
  /** Percentage distance from current price to target, e.g. 6.2 */
  distancePercent: number
  /** 0–100 fill value for the progress bar toward target */
  progressPercent: number
  /** Default stake amount in USD */
  defaultStake: number
  /** Payout if you stake defaultStake and the trade resolves in your favour */
  potentialPayout: number
  /** Display string for risk/reward ratio, e.g. "1:2.18" */
  riskReward: string
  isLive: boolean
  chartData: ChartDataPoint[]
}
