"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import type { ChartDataPoint } from "@/types/trade"

const MAX_CHART_POINTS = 60
const RECONNECT_DELAY_MS = 3000
/** Only append a new chart point every N seconds to keep the sparkline readable */
const CHART_SAMPLE_INTERVAL_S = 5

export interface TickerData {
  price: number
  priceChangePct: number
  /** 24h open price — used to compute progress toward target */
  openPrice: number
  chartData: ChartDataPoint[]
  isConnected: boolean
  error: string | null
}

interface BinanceTickerMessage {
  c: string // last price
  P: string // price change %
  o: string // open price (24h)
}

export function useBinanceTicker(symbol: string): TickerData {
  const [state, setState] = useState<TickerData>({
    price: 0,
    priceChangePct: 0,
    openPrice: 0,
    chartData: [],
    isConnected: false,
    error: null,
  })

  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const chartIndexRef = useRef(0)
  const lastChartSampleRef = useRef(0)
  const mountedRef = useRef(true)

  const connect = useCallback(() => {
    if (!mountedRef.current) return

    const url = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`
    const ws = new WebSocket(url)
    wsRef.current = ws

    ws.onopen = () => {
      if (!mountedRef.current) return
      setState((prev) => ({ ...prev, isConnected: true, error: null }))
    }

    ws.onmessage = (event: MessageEvent<string>) => {
      if (!mountedRef.current) return
      try {
        const tick = JSON.parse(event.data) as BinanceTickerMessage
        const price = parseFloat(tick.c)
        const priceChangePct = parseFloat(tick.P)
        const openPrice = parseFloat(tick.o)
        const now = Date.now() / 1000
        const shouldSample = now - lastChartSampleRef.current >= CHART_SAMPLE_INTERVAL_S
        let sampleIdx = -1
        if (shouldSample) {
          lastChartSampleRef.current = now
          sampleIdx = chartIndexRef.current++
        }

        setState((prev) => {
          let chartData = prev.chartData
          if (shouldSample) {
            const newPoint: ChartDataPoint = { index: sampleIdx, value: price }
            const raw = [...chartData, newPoint].slice(-MAX_CHART_POINTS)
            // keep indices contiguous for the SVG path builder
            chartData = raw.map((p, i) => ({ ...p, index: i }))
          }
          return { ...prev, price, priceChangePct, openPrice, chartData }
        })
      } catch {
        // malformed frame — ignore
      }
    }

    ws.onerror = () => {
      if (!mountedRef.current) return
      setState((prev) => ({ ...prev, error: "WebSocket error" }))
    }

    ws.onclose = () => {
      if (!mountedRef.current) return
      setState((prev) => ({ ...prev, isConnected: false }))
      reconnectTimer.current = setTimeout(connect, RECONNECT_DELAY_MS)
    }
  }, [symbol])

  useEffect(() => {
    mountedRef.current = true
    connect()
    return () => {
      mountedRef.current = false
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current)
      wsRef.current?.close()
    }
  }, [connect])

  return state
}
