import type { TradeAsset } from "@/types/trade"

interface AssetHeaderProps {
  asset: TradeAsset
  isLive: boolean
}

export function AssetHeader({ asset, isLive }: AssetHeaderProps) {
  return (
    <div className="flex justify-between items-start mb-6">
      <div className="flex gap-2 items-center">
        <div
          className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center text-white text-xs font-black"
          style={asset.logoUrl ? undefined : { backgroundColor: asset.brandColor }}
        >
          {asset.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={asset.logoUrl} alt={asset.name} className="w-full h-full object-cover" />
          ) : (
            <span className="p-1.5">{asset.symbol.slice(0, 1)}</span>
          )}
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-on-surface font-sans text-xl leading-none">
            {asset.symbol}
          </span>
          <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mt-1">
            {asset.name}
          </span>
        </div>
      </div>

      {isLive && (
        <div className="flex items-center gap-1.5 px-3 py-1 bg-surface-container rounded-full border border-border-glass">
          <span className="w-2 h-2 rounded-full bg-bullish-green animate-pulse-green" />
          <span className="text-[11px] text-bullish-green font-bold tracking-widest uppercase">
            Live
          </span>
        </div>
      )}
    </div>
  )
}
