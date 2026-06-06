export function BackgroundDecoration() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-bullish-green/5 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-bullish-green/5 blur-[100px]" />
    </div>
  )
}
