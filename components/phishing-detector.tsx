"use client"

import type React from "react"

import { useState } from "react"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ResultDisplay from "./result-display"
import LoadingSpinner from "./loading-spinner"

export default function PhishingDetector() {
  const [url, setUrl] = useState("")
  const [result, setResult] = useState<{
    message: string
    isSafe: boolean
    percentage: number
  } | null>(null)
  const [loading, setLoading] = useState(false)

  const analyzeUrl = (inputUrl: string) => {
    // Check if 5th character is ':'
    if (inputUrl.length >= 5 && inputUrl[4] === ":") {
      return {
        message: "url is 100% unsafe",
        isSafe: false,
        percentage: 0,
      }
    }

    // Check if 5th character is 's'
    if (inputUrl.length >= 5 && inputUrl[4] === "s") {
      // Check for query parameters
      const suspiciousParams = ["id", "file", "url"]
      const hasQueryString = inputUrl.includes("?")

      if (hasQueryString) {
        const queryString = inputUrl.substring(inputUrl.indexOf("?"))
        const hasSuspiciousParam = suspiciousParams.some(
          (param) => queryString.includes(`${param}=`) || queryString.includes(`&${param}=`),
        )

        if (hasSuspiciousParam) {
          const percentage = Math.floor(Math.random() * (80 - 70 + 1)) + 70
          return {
            message: `url is ${percentage}% safe`,
            isSafe: true,
            percentage,
          }
        }
      }

      // No suspicious params or no query string
      const percentage = Math.floor(Math.random() * (100 - 95 + 1)) + 95
      return {
        message: `url is ${percentage}% safe`,
        isSafe: true,
        percentage,
      }
    }

    // Default case for other characters
    return {
      message: "Unable to determine - please check the URL format",
      isSafe: true,
      percentage: 50,
    }
  }

  const handleCheck = () => {
    if (!url.trim()) return

    setLoading(true)
    setTimeout(() => {
      const analysisResult = analyzeUrl(url)
      setResult(analysisResult)
      setUrl("")
      setLoading(false)
    }, 4000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && url.trim()) {
      handleCheck()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Phishing URL Detection</h1>
          </div>
          <p className="text-muted-foreground text-lg">Analyze URLs to check for potential phishing threats</p>
        </div>

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Input Section */}
        {!result && !loading && (
          <div className="bg-card rounded-xl shadow-md p-8 mb-8">
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-foreground">Enter URL to analyze</label>
              <div className="flex gap-3">
                <Input
                  type="text"
                  placeholder="https://example.com..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 py-3 px-4 text-base"
                  disabled={loading}
                />
                <Button
                  onClick={handleCheck}
                  disabled={!url.trim() || loading}
                  className="px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                >
                  {loading ? "Checking..." : "Check"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Result Section */}
        {result && <ResultDisplay result={result} onReset={() => setResult(null)} />}
      </div>
    </div>
  )
}
