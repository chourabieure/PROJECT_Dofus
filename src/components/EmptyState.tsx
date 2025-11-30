export function EmptyState() {
  return (
    <section className="text-center py-16">
      <div className="text-6xl mb-4">📊</div>
      <h2 className="text-xl font-semibold mb-2 text-amber-600">
        No items yet
      </h2>
      <p className="text-(--text-muted) max-w-md mx-auto">
        Start by setting the kama prices above (cost of 1M kamas in €), then add
        items you want to compare between Mikhal and Draconiros.
      </p>
    </section>
  );
}

