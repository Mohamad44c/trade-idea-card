# Trade Idea Card — Component Reference

A fintech UI built with Next.js 16, React 19, TypeScript, Tailwind v4, and shadcn/ui.

---

## Design Tokens

All design tokens live in `src/app/globals.css`. The `@theme` block defines dark-mode defaults (CSS custom properties at `:root`). Light-mode values are overridden in `@layer base { :root:not(.dark) { … } }` — Tailwind utilities pick up whichever value is active.

### Colour tokens

| Token | Dark value | Light value | Utility classes |
| --- | --- | --- | --- |
| `bullish-green` | `#00FF88` | `#00955B` | `bg-bullish-green`, `text-bullish-green` |
| `bearish-coral` | `#FF4D6A` | `#D93654` | `bg-bearish-coral`, `text-bearish-coral` |
| `background` | `#0A0A0F` | `#F0F4F8` | `bg-background` |
| `surface-card` | `#13131A` | `#FFFFFF` | `bg-surface-card` |
| `surface-container` | `#1f1f25` | `#EDF1F7` | `bg-surface-container` |
| `on-surface` | `#e4e1e9` | `#0D1117` | `text-on-surface` |
| `on-surface-variant` | `#b9cbb9` | `#4A5E78` | `text-on-surface-variant` |
| `on-primary` | `#003919` | `#FFFFFF` | `text-on-primary` |
| `border-glass` | `rgba(255,255,255,0.08)` | `rgba(0,0,0,0.10)` | `border-border-glass` |

### Custom utilities (`@layer utilities`)

| Class | Effect |
| --- | --- |
| `.glass-border` | `border: 1px solid var(--color-border-glass)` — responds to theme |
| `.animate-pulse-green` | Radial glow pulse keyframe (2s infinite) |
| `.font-inter` | Inter variable font |
| `.font-geist` | Geist sans font |

### Custom spacing

| Token | Value | Example usage |
| --- | --- | --- |
| `gutter` | `1.5rem` | `p-gutter`, `gap-gutter` |
| `container-padding-mobile` | `1.25rem` | `px-container-padding-mobile` |
| `container-padding-desktop` | `2.5rem` | `px-container-padding-desktop` |

---

## Data Model

**`src/types/trade.ts`** — `TradeIdea` is the canonical data shape.  
**`src/data/sample-trade.ts`** — `sampleBtcTrade` is the demo fixture (BTC, $105k target).

```ts
interface TradeAsset {
  symbol: string
  name: string
  brandColor: string   // Hex, used as fallback icon background
  logoUrl?: string     // Optional path in /public, e.g. "/icons/btc.svg"
}

interface TradeIdea {
  id: string
  asset: TradeAsset
  question: string
  direction: "CALL" | "PUT"
  optionType: "Touch" | "No Touch" | "Barrier" | "Vanilla"
  expiresAt: string
  currentPrice: number
  priceChangePct: number
  targetPrice: number
  distancePercent: number   // 0–100 %
  progressPercent: number   // 0–100 fill for the progress bar
  defaultStake: number
  potentialPayout: number
  riskReward: string        // e.g. "1:2.18"
  isLive: boolean
  chartData: ChartDataPoint[]
}
```

---

## Component Tree

```
layout.tsx (server)
├── <script>               inline — reads localStorage, sets/removes .dark before paint
└── ThemeProvider (client) — theme context, toggle(), localStorage sync
    └── page.tsx (server)
        ├── BackgroundDecoration   (server) — fixed ambient blur blobs, -z-10
        ├── TopNav                 (server) — fixed header h-16, z-50, backdrop-blur
        │   └── ThemeToggle        (client) — Sun/Moon button, mounted-gated
        ├── Sidebar                (server) — desktop only (lg:flex), w-64
        ├── <main>
        │   └── LiveTradeIdeaCard  (client) — klines seed + WebSocket merge
        │       └── TradeIdeaCard  (server) — composes all card sub-components
        │           ├── AssetHeader    (server) — logo img or branded initial + live badge
        │           ├── TradeTags      (server) — direction/expiry/type chips
        │           ├── PriceDisplay   (server) — USD price + signed % badge
        │           ├── DistanceBar    (server) — progress bar toward target
        │           ├── MiniChart      (client) — SVG sparkline, data-range Y-axis
        │           ├── PotentialReturn(server) — stake → payout + risk/reward
        │           ├── BuyButton      (client) — CTA with loading state
        │           └── TrustBadges    (server) — safety copy row
        └── BottomNav              (server) — mobile only (lg:hidden), fixed bottom
```

---

## Layout Components

| Component | File | Behaviour |
| --- | --- | --- |
| `<ThemeProvider />` | `layout/theme-provider.tsx` | Client context; syncs state from DOM class on mount |
| `<ThemeToggle />` | `layout/theme-toggle.tsx` | Sun (dark) / Moon (light); renders placeholder until mounted |
| `<TopNav />` | `layout/top-nav.tsx` | Fixed, h-16, z-50, backdrop-blur; contains ThemeToggle |
| `<Sidebar />` | `layout/sidebar.tsx` | Desktop only (`lg:flex`), w-64 |
| `<BottomNav />` | `layout/bottom-nav.tsx` | Mobile only (`lg:hidden`), fixed bottom |
| `<BackgroundDecoration />` | `layout/background-decoration.tsx` | Fixed, -z-10, pointer-events-none, aria-hidden |

---

## Trade Idea Card Sub-components

| Component | File | Notes |
| --- | --- | --- |
| `<AssetHeader />` | `trade-idea-card/asset-header.tsx` | Renders `<img src={logoUrl}>` when set; falls back to branded initial on coloured circle |
| `<TradeTags />` | `trade-idea-card/trade-tags.tsx` | Green for CALL, coral for PUT |
| `<PriceDisplay />` | `trade-idea-card/price-display.tsx` | `Intl.NumberFormat` USD; signed % badge |
| `<DistanceBar />` | `trade-idea-card/distance-bar.tsx` | Animated green progress bar with glow shadow |
| `<MiniChart />` | `trade-idea-card/mini-chart.tsx` | `"use client"` — SVG sparkline; Y-axis scaled to data range; strike line clamped with ↑/↓ when off-chart |
| `<PotentialReturn />` | `trade-idea-card/potential-return.tsx` | Stake/payout/risk display |
| `<BuyButton />` | `trade-idea-card/buy-button.tsx` | `"use client"` — simulated loading state, direction-aware colour |
| `<TrustBadges />` | `trade-idea-card/trust-badges.tsx` | Shield + Clock safety copy |

---

## Live Data Hook

**`src/hooks/use-binance-ticker.ts`**

```ts
useBinanceTicker(symbol: string): TickerData
```

### Startup sequence

1. **Klines fetch (REST)** — fires immediately on mount; fetches 60 one-minute closing prices from `https://api.binance.com/api/v3/klines?symbol={SYMBOL}&interval=1m&limit=60`. Seeds `chartData` so the sparkline shows a full hour of real history before the first WebSocket tick.
2. **WebSocket** — connects to `wss://stream.binance.com:9443/ws/{symbol}@ticker` in parallel; appends a new chart point every `CHART_SAMPLE_INTERVAL_S` seconds as a rolling window on top of the seed.

### Constants

| Constant | Default | Effect |
| --- | --- | --- |
| `MAX_CHART_POINTS` | `60` | Maximum data points kept in the rolling window |
| `CHART_SAMPLE_INTERVAL_S` | `5` | Minimum seconds between chart samples |
| `RECONNECT_DELAY_MS` | `3000` | Delay before reconnecting after a disconnect |

### Return value

```ts
interface TickerData {
  price: number
  priceChangePct: number
  openPrice: number       // 24h open, used to compute progress toward target
  chartData: ChartDataPoint[]
  isConnected: boolean
  error: string | null
}
```

---

## Asset Logos

Drop an SVG into `public/icons/` and set `logoUrl` on the asset:

```ts
asset: {
  symbol: "BTC",
  name: "Bitcoin",
  brandColor: "#F7931A",
  logoUrl: "/icons/btc.svg",
}
```

`AssetHeader` renders it via `<img>` when present, or falls back to the first letter of `symbol` on a `brandColor` background circle. No component changes are needed when adding a new asset logo.

---

## Usage

```tsx
// Static card
import { TradeIdeaCard } from "@/components/trade-idea-card"
<TradeIdeaCard trade={myTrade} />

// Live card (Binance WebSocket + historical klines)
import { LiveTradeIdeaCard } from "@/components/trade-idea-card/live-wrapper"
<LiveTradeIdeaCard base={myTrade} />
```

Direction `"PUT"` automatically switches the colour scheme to `bearish-coral`.
