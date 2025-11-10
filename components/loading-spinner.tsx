export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-16">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-border"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"></div>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">Analyzing URL</h3>
        <p className="text-sm text-muted-foreground">Please wait while we check the URL for threats...</p>
      </div>
    </div>
  )
}
