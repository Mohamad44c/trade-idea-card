import { Bell, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"

const navLinks = [
  { label: "Markets", active: true },
  { label: "Portfolio", active: false },
  { label: "Discover", active: false },
]

export function TopNav() {
  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 h-16",
        "bg-background/80 backdrop-blur-md border-b border-border-glass",
        "flex items-center justify-between",
        "px-container-padding-mobile md:px-container-padding-desktop"
      )}
    >
      {/* Left side */}
      <div className="flex items-center gap-8">
        <span className="font-sans font-bold text-xl tracking-tight text-bullish-green">
          ClickOptions
        </span>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(({ label, active }) => (
            <a
              key={label}
              href="#"
              className={cn(
                "text-xs font-semibold uppercase tracking-wider transition-colors",
                active
                  ? "text-primary border-b-2 border-bullish-green pb-0.5"
                  : "text-on-surface-variant hover:text-primary"
              )}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <ThemeToggle />

        <button
          type="button"
          aria-label="Notifications"
          className="text-on-surface-variant hover:text-primary transition-colors"
        >
          <Bell size={20} />
        </button>

        <button
          type="button"
          aria-label="Wallet"
          className="text-on-surface-variant hover:text-primary transition-colors"
        >
          <Wallet size={20} />
        </button>

        {/* Avatar */}
        <div
          className={cn(
            "w-8 h-8 rounded-full border border-border-glass",
            "bg-surface-container overflow-hidden",
            "flex items-center justify-center"
          )}
        >
          <span className="text-xs font-bold text-on-surface-variant">MC</span>
        </div>
      </div>
    </header>
  )
}
