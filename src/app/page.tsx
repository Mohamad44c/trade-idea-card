import { TopNav } from "@/components/layout/top-nav"
import { Sidebar } from "@/components/layout/sidebar"
import { BottomNav } from "@/components/layout/bottom-nav"
import { BackgroundDecoration } from "@/components/layout/background-decoration"
import { LiveTradeIdeaCard } from "@/components/trade-idea-card/live-wrapper"
import { sampleBtcTrade } from "@/data/sample-trade"

export default function HomePage() {
  return (
    <>
      <BackgroundDecoration />
      <TopNav />
      <Sidebar />
      <main className="grow pt-32 pb-24 md:pb-8 lg:ml-64 flex items-center justify-center px-container-padding-mobile">
        <LiveTradeIdeaCard base={sampleBtcTrade} />
      </main>
      <BottomNav />
    </>
  )
}
