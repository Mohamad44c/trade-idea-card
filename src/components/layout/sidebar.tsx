import {
  Trophy,
  TrendingUp,
  Lightbulb,
  History,
  Settings,
  HelpCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    label: "Terminal",
    icon: TrendingUp,
    active: true,
  },
  {
    label: "Insights",
    icon: Lightbulb,
    active: false,
  },
  {
    label: "History",
    icon: History,
    active: false,
  },
  {
    label: "Settings",
    icon: Settings,
    active: false,
  },
  {
    label: "Help",
    icon: HelpCircle,
    active: false,
  },
]

export function Sidebar() {
  return (
    <aside
      className={cn(
        "hidden lg:flex",
        "fixed left-0 top-16 bottom-0",
        "w-64",
        "bg-surface-container border-r border-border-glass",
        "flex-col p-gutter gap-2 z-40"
      )}
    >
      {/* Account badge */}
      <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-variant/30 glass-border">
        <div className="w-10 h-10 rounded-lg bg-primary-container/10 flex items-center justify-center shrink-0">
          <Trophy size={20} className="text-bullish-green" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">
            Premium Account
          </span>
          <span className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">
            Tier 3 Advisor
          </span>
        </div>
      </div>

      {/* Nav buttons */}
      <nav className="mt-4 flex flex-col gap-2">
        {navItems.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            type="button"
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg text-left",
              active
                ? "font-bold bg-primary-container/10 text-bullish-green translate-x-1"
                : "text-on-surface-variant hover:bg-surface-variant transition-colors"
            )}
          >
            <Icon size={18} />
            <span className="text-xs font-semibold">{label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom CTA */}
      <button
        type="button"
        className={cn(
          "mt-auto",
          "bg-bullish-green text-on-primary font-black",
          "py-3 rounded-lg",
          "hover:brightness-110 active:scale-95 transition-all",
          "text-sm"
        )}
      >
        New Trade
      </button>
    </aside>
  )
}
