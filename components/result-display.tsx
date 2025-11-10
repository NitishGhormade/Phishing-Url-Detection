"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle2, RotateCcw } from "lucide-react"

interface ResultDisplayProps {
  result: {
    message: string
    isSafe: boolean
    percentage: number
  }
  onReset: () => void
}

export default function ResultDisplay({ result, onReset }: ResultDisplayProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(true)
  }, [])

  const bgColor = result.isSafe ? "bg-success/10" : "bg-destructive/10"
  const borderColor = result.isSafe ? "border-success/30" : "border-destructive/30"
  const textColor = result.isSafe ? "text-success" : "text-destructive"
  const titleColor = result.isSafe ? "text-success" : "text-destructive"

  return (
    <div className={`transition-all duration-500 ${isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
      <div className={`rounded-xl shadow-lg p-8 border-2 ${bgColor} ${borderColor}`}>
        {/* Icon and Title */}
        <div className="flex items-center gap-4 mb-6">
          {result.isSafe ? (
            <CheckCircle2 className={`w-12 h-12 ${textColor}`} />
          ) : (
            <AlertCircle className={`w-12 h-12 ${textColor}`} />
          )}
          <div>
            <h2 className={`text-3xl font-bold ${titleColor}`}>{result.isSafe ? "Analysis Complete" : "Warning"}</h2>
            <p className="text-muted-foreground text-sm">
              {result.isSafe ? "URL safety assessment" : "Threat detected"}
            </p>
          </div>
        </div>

        {/* Result Message */}
        <div className="bg-background/50 rounded-lg p-6 mb-6 border border-border">
          <p className={`text-2xl font-bold capitalize ${textColor} text-balance`}>{result.message}</p>
        </div>

        {/* Safety Indicator */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-foreground">Safety Score</span>
            <span className={`text-lg font-bold ${textColor}`}>{result.percentage}%</span>
          </div>
          <div className="w-full h-3 bg-background/50 rounded-full overflow-hidden border border-border">
            <div
              className={`h-full transition-all duration-700 ease-out ${
                result.isSafe ? "bg-success" : "bg-destructive"
              }`}
              style={{ width: `${result.percentage}%` }}
            />
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-background/50 rounded-lg p-4 mb-6 border border-border">
          <p className="text-sm text-muted-foreground">
            {result.isSafe ? (
              <>
                <span className="font-semibold text-foreground">✓ Recommendation:</span> This URL appears to be safe to
                visit. However, always verify the source before clicking links.
              </>
            ) : (
              <>
                <span className="font-semibold text-destructive">⚠ Recommendation:</span> Avoid visiting this URL as it
                has been flagged as unsafe. Do not enter any sensitive information.
              </>
            )}
          </p>
        </div>

        {/* Reset Button */}
        <Button
          onClick={onReset}
          variant="outline"
          className="w-full flex items-center justify-center gap-2 py-3 bg-transparent"
        >
          <RotateCcw className="w-4 h-4" />
          Check Another URL
        </Button>
      </div>
    </div>
  )
}
