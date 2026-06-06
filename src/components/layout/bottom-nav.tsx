import { BarChart2, ClipboardList, BellRing, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    label: "Trade",
    icon: BarChart2,
    active: true,
  },
  {
    label: "Orders",
    icon: ClipboardList,
    active: false,
  },
  {
    label: "Alerts",
    icon: BellRing,
    active: false,
  },
  {
    label: "Wallet",
    icon: Wallet,
    active: false,
  },
]

export function BottomNav() {
  return (
    <nav
      className={cn(
        "lg:hidden",
        "fixed bottom-0 left-0 w-full z-50 h-16",
        "bg-surface-container-high/80 backdrop-blur-md border-t border-border-glass",
        "flex justify-around items-center px-4"
      )}
    >
      {navItems.map(({ label, icon: Icon, active }) => (
        <button
          key={label}
          type="button"
          className={cn(
            "flex flex-col items-center justify-center gap-1",
            active
              ? "text-bullish-green"
              : "text-on-surface-variant hover:text-bullish-green"
          )}
        >
          <Icon size={22} />
          <span className="text-[10px] font-semibold uppercase tracking-wider">
            {label}
          </span>
        </button>
      ))}
    </nav>
  )
}
