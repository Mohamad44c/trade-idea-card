# Trade Idea Card — Component Reference

A fintech UI built with Next.js 16, React 19, TypeScript, Tailwind v4, and shadcn/ui.

## Design Tokens

All design tokens live in `src/app/globals.css` inside the `@theme` block and are available as Tailwind utilities.

| Token | Value | Utility classes |
|---|---|---|
| `bullish-green` | `#00FF88` | `bg-bullish-green`, `text-bullish-green` |
| `bearish-coral` | `#FF4D6A` | `bg-bearish-coral`, `text-bearish-coral` |
| `surface-card` | `#13131A` | `bg-surface-card` |
| `surface-container` | `#1f1f25` | `bg-surface-container` |
| `border-glass` | `rgba(255,255,255,0.08)` | `border-border-glass` |
| `on-surface-variant` | `#b9cbb9` | `text-on-surface-variant` |

Custom utilities defined in `@layer utilities`:
- `.glass-border` — 1px solid rgba(255,255,255,0.08)
- `.animate-pulse-green` — radial glow pulse keyframe animation

Custom spacing:
- `p-gutter` / `gap-gutter` — 24px
- `px-container-padding-mobile` — 20px
- `px-container-padding-desktop` — 40px

## Data Model

**`src/types/trade.ts`** — `TradeIdea` is the canonical data shape.  
**`src/data/sample-trade.ts`** — `sampleBtcTrade` is the demo fixture.

```ts
import type { TradeIdea } from "@/types/trade"

const myTrade: TradeIdea = {
  id: "eth-touch-4k",
  asset: { symbol: "ETH", name: "Ethereum", brandColor: "#627EEA" },
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
  chartData: [/* ChartDataPoint[] */],
}
```

## Component Tree

```
page.tsx (server)
├── BackgroundDecoration   (server) — ambient blur blobs
├── TopNav                 (server) — fixed header h-16
├── Sidebar                (server) — desktop fixed left sidebar
├── <main>
│   └── TradeIdeaCard      (server) — composes all card sub-components
│       ├── AssetHeader    (server) — symbol + live badge
│       ├── TradeTags      (server) — direction/expiry/type chips
│       ├── PriceDisplay   (server) — price + % change
│       ├── DistanceBar    (server) — progress bar toward target
│       ├── MiniChart      (client) — SVG sparkline with strike line
│       ├── PotentialReturn(server) — stake → payout + risk/reward
│       ├── BuyButton      (client) — CTA with loading state
│       └── TrustBadges    (server) — safety copy
└── BottomNav              (server) — mobile fixed bottom bar
```

## Layout

| Component | File | Behaviour |
|---|---|---|
| `<TopNav />` | `components/layout/top-nav.tsx` | Fixed, h-16, z-50, backdrop-blur |
| `<Sidebar />` | `components/layout/sidebar.tsx` | Desktop only (`lg:flex`), w-64 |
| `<BottomNav />` | `components/layout/bottom-nav.tsx` | Mobile only (`lg:hidden`), fixed bottom |
| `<BackgroundDecoration />` | `components/layout/background-decoration.tsx` | Fixed, -z-10, pointer-events-none |

## Trade Idea Card Sub-components

| Component | File | Notes |
|---|---|---|
| `<AssetHeader />` | `trade-idea-card/asset-header.tsx` | Coloured icon, symbol, live dot |
| `<TradeTags />` | `trade-idea-card/trade-tags.tsx` | Green for CALL, red for PUT |
| `<PriceDisplay />` | `trade-idea-card/price-display.tsx` | Formats USD, shows signed % |
| `<DistanceBar />` | `trade-idea-card/distance-bar.tsx` | Animated progress bar |
| `<MiniChart />` | `trade-idea-card/mini-chart.tsx` | `"use client"` — SVG sparkline |
| `<PotentialReturn />` | `trade-idea-card/potential-return.tsx` | Stake/payout/risk display |
| `<BuyButton />` | `trade-idea-card/buy-button.tsx` | `"use client"` — loading state |
| `<TrustBadges />` | `trade-idea-card/trust-badges.tsx` | Safety copy row |

## Usage

```tsx
import { TradeIdeaCard } from "@/components/trade-idea-card"
import type { TradeIdea } from "@/types/trade"

<TradeIdeaCard trade={myTrade} />
```

Pass any `TradeIdea`-shaped object to render a different trade. Direction `"PUT"` automatically switches the colour scheme from green to `bearish-coral`.
