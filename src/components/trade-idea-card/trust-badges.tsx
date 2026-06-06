import { Shield, Clock } from "lucide-react"

export function TrustBadges() {
  return (
    <div className="mt-3 md:mt-4 flex items-center justify-center gap-3">
      <div className="flex items-center gap-1">
        <Shield className="w-3.5 h-3.5 text-on-surface-variant" />
        <span className="text-[11px] text-on-surface-variant">No liquidation risk</span>
      </div>
      <div className="w-1 h-1 rounded-full bg-on-surface-variant/30" />
      <div className="flex items-center gap-1">
        <Clock className="w-3.5 h-3.5 text-on-surface-variant" />
        <span className="text-[11px] text-on-surface-variant">Expires automatically</span>
      </div>
    </div>
  )
}
