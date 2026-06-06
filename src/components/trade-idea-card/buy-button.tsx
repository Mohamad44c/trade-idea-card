"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface BuyButtonProps {
  direction: "CALL" | "PUT"
}

export function BuyButton({ direction }: BuyButtonProps) {
  const [loading, setLoading] = useState(false)

  function handleClick() {
    setLoading(true)
    setTimeout(() => setLoading(false), 1200)
  }

  const isBullish = direction === "CALL"

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={cn(
        "w-full font-black py-4 rounded-xl transition-all duration-200 active:scale-95 text-sm uppercase tracking-wider",
        isBullish
          ? "bg-bullish-green hover:bg-primary-fixed-dim text-on-primary-fixed shadow-[0_0_30px_rgba(0,255,136,0.2)]"
          : "bg-bearish-coral hover:brightness-110 text-white shadow-[0_0_30px_rgba(255,77,106,0.2)]",
        loading && "opacity-70 cursor-not-allowed",
      )}
    >
      {loading ? "Processing…" : "Buy This Option"}
    </button>
  )
}
