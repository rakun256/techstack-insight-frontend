export default function Card({ title, description, children, className = "" }) {
  return (
    <section
      className={`rounded-2xl border border-[#cdeee4]/70 bg-white p-5 shadow-sm ${className}`}
    >
      {(title || description) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-base font-semibold text-slate-950">{title}</h3>
          )}
          {description && (
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          )}
        </div>
      )}

      {children}
    </section>
  );
}
