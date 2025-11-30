export function Header() {
  return (
    <header className="border-b border-(--card-border) bg-(--card-bg)/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-amber-600">
              Dofus Market Analyzer
            </h1>
            <p className="text-(--text-muted) text-sm mt-1">
              Mikhal → Draconiros Transfer Optimizer
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm text-(--text-muted)">
            <span className="inline-block w-3 h-3 rounded-full bg-(--mikhal-accent)"></span>
            <span>Mikhal</span>
            <span className="mx-2">→</span>
            <span className="inline-block w-3 h-3 rounded-full bg-(--draconiros-accent)"></span>
            <span>Draconiros</span>
          </div>
        </div>
      </div>
    </header>
  );
}

