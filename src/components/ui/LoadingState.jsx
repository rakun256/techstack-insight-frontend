const variantConfig = {
  dashboard: {
    label: "Analytics",
    bars: ["h-5 bg-[#5dd39e]", "h-10 bg-[#114444]", "h-7 bg-[#167070]", "h-12 bg-[#bbeedd]"],
  },
  jobs: {
    label: "Jobs",
    bars: ["h-8 bg-[#114444]", "h-4 bg-[#5dd39e]", "h-10 bg-[#167070]", "h-6 bg-[#bbeedd]"],
  },
  skills: {
    label: "Skills",
    bars: ["h-6 bg-[#5dd39e]", "h-6 bg-[#114444]", "h-6 bg-[#167070]", "h-6 bg-[#bbeedd]"],
  },
  companies: {
    label: "Companies",
    bars: ["h-10 bg-[#114444]", "h-10 bg-[#5dd39e]", "h-5 bg-[#167070]", "h-5 bg-[#bbeedd]"],
  },
  detail: {
    label: "Details",
    bars: ["h-4 bg-[#bbeedd]", "h-9 bg-[#114444]", "h-9 bg-[#167070]", "h-4 bg-[#5dd39e]"],
  },
  default: {
    label: "Loading",
    bars: ["h-5 bg-[#5dd39e]", "h-9 bg-[#114444]", "h-7 bg-[#167070]", "h-11 bg-[#bbeedd]"],
  },
};

export default function LoadingState({
  title = "Loading data",
  message = "Preparing the latest insights.",
  variant = "default",
  compact = false,
  className = "",
}) {
  const config = variantConfig[variant] || variantConfig.default;

  return (
    <div
      role="status"
      aria-live="polite"
      className={[
        "flex flex-col items-center justify-center rounded-2xl border border-[#cdeee4]/70 bg-gradient-to-br from-white via-white to-[#f7fffb] p-6 text-center shadow-sm",
        compact ? "min-h-[180px]" : "min-h-[260px]",
        className,
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className={[
          "relative flex items-end justify-center rounded-3xl border border-[#cdeee4] bg-[#e8fff4] shadow-sm",
          compact ? "h-20 w-20" : "h-24 w-24",
        ].join(" ")}
      >
        <div className="absolute inset-3 rounded-2xl bg-[#bbeedd]/40 blur-xl" />
        <div className="relative flex h-14 items-end gap-1.5">
          {config.bars.map((barClass, index) => (
            <span
              key={`${config.label}-${barClass}`}
              className={[
                "w-2.5 rounded-full animate-pulse",
                barClass,
                index % 2 === 0 ? "delay-150" : "delay-300",
              ].join(" ")}
            />
          ))}
        </div>
      </div>

      <span className="mt-5 rounded-full border border-[#cdeee4] bg-[#e8fff4] px-3 py-1 text-xs font-semibold text-[#114444]">
        {config.label}
      </span>

      <h2 className="mt-4 text-lg font-semibold text-slate-950 sm:text-xl">
        {title}
      </h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        {message}
      </p>

      <div aria-hidden="true" className="mt-5 flex items-center gap-1.5">
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#114444]" />
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#167070] delay-150" />
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#5dd39e] delay-300" />
      </div>

      {!compact && (
        <div aria-hidden="true" className="mt-6 w-full max-w-sm space-y-2">
          <div className="h-2 animate-pulse rounded-full bg-[#e8fff4]" />
          <div className="mx-auto h-2 w-4/5 animate-pulse rounded-full bg-[#e8fff4]" />
          <div className="mx-auto h-2 w-3/5 animate-pulse rounded-full bg-[#e8fff4]" />
        </div>
      )}
    </div>
  );
}
