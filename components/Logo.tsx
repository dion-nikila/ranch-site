export function Logo({ compact = false, inverse = false }: { compact?: boolean; inverse?: boolean }) {
  return (
    <a className="group flex items-center gap-3" href="#" aria-label="Willow Creek Ranch home">
      <span className={`flex h-11 w-11 items-center justify-center border font-serif text-3xl leading-none transition-colors group-hover:border-[var(--gold)] ${inverse ? "border-white/20 bg-white/[0.03] text-white" : "border-[var(--border)] bg-[var(--card)] text-[var(--text)]"}`}>
        W
      </span>
      {!compact && (
        <span className="leading-none">
          <span className={`block font-serif text-[1.05rem] uppercase tracking-[0.18em] ${inverse ? "text-white" : "text-[var(--text)]"}`}>
            Willow Creek
          </span>
          <span className={`mt-1 block text-[0.57rem] font-semibold uppercase tracking-[0.46em] ${inverse ? "text-white/52" : "text-[var(--muted)]"}`}>
            Ranch
          </span>
        </span>
      )}
    </a>
  );
}
