# Trade Idea Card

A production-ready options trading UI card built with Next.js 16, React 19, TypeScript, Tailwind v4, and shadcn/ui. Streams live BTC price data over WebSocket from Binance's public feed with historical chart seeding from the Binance klines REST API.

---

## Features

- **Live price feed** — WebSocket connection to Binance (`@ticker` stream), auto-reconnects on disconnect
- **Historical chart** — seeds the sparkline with 60 one-minute klines from the Binance REST API on mount, then appends live ticks as a rolling window
- **Sparkline chart** — raw SVG price chart scaled to the data range; dashed strike-price line clamps to chart bounds with a directional arrow when the target is off-chart
- **Light / dark theme** — toggle in the top nav; preference persisted to `localStorage`; inline script prevents flash on reload
- **CALL / PUT support** — direction-aware colour theming (bullish green / bearish coral)
- **Asset logos** — optional `logoUrl` field on `TradeAsset`; falls back to a branded initial when not set
- **Responsive layout** — desktop sidebar + fixed top nav; mobile bottom navigation bar
- **Zero third-party chart library** — chart rendered with raw SVG

---

## Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind v4 + tw-animate-css |
| Components | shadcn/ui (radix-nova) |
| Icons | lucide-react |
| Fonts | Geist (headings) + Inter (body) via `next/font` |
| Live data | Binance WebSocket + REST public API |

---

## Project Structure

```text
public/
  icons/
    btc.svg              # Bitcoin logo SVG
src/
  app/
    globals.css          # Design tokens (@theme dark defaults + @layer base light overrides)
    layout.tsx           # Root layout — fonts, FOUC-prevention script, ThemeProvider
    page.tsx             # Entry page
  components/
    layout/
      theme-provider.tsx # Client context — theme state, toggle(), localStorage sync
      theme-toggle.tsx   # Sun / Moon button (client, mounted-gated to avoid hydration mismatch)
      top-nav.tsx        # Fixed header with ThemeToggle
      sidebar.tsx        # Desktop left sidebar
      bottom-nav.tsx     # Mobile bottom bar
      background-decoration.tsx
    trade-idea-card/
      index.tsx          # Card root — composes all sub-components
      asset-header.tsx   # Asset logo (or branded initial) + symbol + live badge
      trade-tags.tsx     # Direction / expiry / type chips
      price-display.tsx  # Current price + % change
      distance-bar.tsx   # Progress bar toward strike target
      mini-chart.tsx     # SVG sparkline — data-range Y-axis, clamped strike line (client)
      potential-return.tsx
      buy-button.tsx     # CTA with loading state (client)
      trust-badges.tsx
      live-wrapper.tsx   # Merges live ticker data into static TradeIdea (client)
  hooks/
    use-binance-ticker.ts  # Klines seed + WebSocket hook — price, chart data, connection state
  types/
    trade.ts             # TradeIdea, TradeAsset, ChartDataPoint
  data/
    sample-trade.ts      # BTC fixture used as the static base
docs/
  COMPONENTS.md          # Full component reference and token table
```

---

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Data Model

The card is driven by a single `TradeIdea` object (see `src/types/trade.ts`). Pass any conforming object to render a different trade:

```tsx
import { LiveTradeIdeaCard } from "@/components/trade-idea-card/live-wrapper"
import type { TradeIdea } from "@/types/trade"

const myTrade: TradeIdea = {
  id: "eth-touch-4k",
  asset: {
    symbol: "ETH",
    name: "Ethereum",
    brandColor: "#627EEA",
    logoUrl: "/icons/eth.svg", // optional — falls back to branded initial
  },
  question: "ETH above $4,000 in 3 days?",
  direction: "CALL",
  optionType: "Touch",
  expiresAt: "Jun 9, 2026",
  currentPrice: 3820,
  priceChangePct: 1.8,
  targetPrice: 4000,
  distancePercent: 4.7,
  progressPercent: 55,
  defaultStake: 100,
  potentialPayout: 185,
  riskReward: "1:1.85",
  isLive: true,
  chartData: [],
}

<LiveTradeIdeaCard base={myTrade} />
```

`LiveTradeIdeaCard` overwrites `currentPrice`, `priceChangePct`, `chartData`, `distancePercent`, `progressPercent`, and `isLive` with real-time values once the WebSocket connects. All other fields come from `base`.

---

## Live Data

### Historical seed (REST)

On mount, `useBinanceTicker` fetches 60 one-minute closing prices from:

```
GET https://api.binance.com/api/v3/klines?symbol={SYMBOL}&interval=1m&limit=60
```

This populates the sparkline immediately so it shows a full hour of real price history before the first WebSocket tick arrives. If the fetch fails, the chart falls back to the static `base.chartData` fixture.

### Real-time stream (WebSocket)

```
wss://stream.binance.com:9443/ws/{symbol}@ticker
```

Returns `{ price, priceChangePct, openPrice, chartData, isConnected, error }` and:

- Appends a new chart point every **5 seconds** (`CHART_SAMPLE_INTERVAL_S`) as a rolling window on top of the seeded history
- Keeps a maximum of **60 points** (`MAX_CHART_POINTS`)
- Auto-reconnects after **3 seconds** on disconnect (`RECONNECT_DELAY_MS`)

No API key required — both endpoints are public and unauthenticated.

---

## Theming

The app ships both dark and light themes. Dark is the default; the toggle persists the preference to `localStorage`.

| Mode | Trigger |
| --- | --- |
| Dark | `.dark` class on `<html>` (default) |
| Light | `.dark` removed from `<html>` |

An inline `<script>` in `<head>` reads `localStorage` before first paint to prevent flash. Theme tokens are defined as CSS custom properties in `globals.css` — the `@theme` block holds the dark defaults and `@layer base { :root:not(.dark) { … } }` holds the light overrides.

---

## Credits

Designed with [Google Stitch](https://stitch.withgoogle.com)

Prompt generated by [Claude](https://claude.ai)
