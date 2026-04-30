export default function LoadingState({ message = "Loading..." }) {
  return (
    <div className="rounded-2xl border border-[#cdeee4]/70 bg-white p-6 text-sm text-slate-500 shadow-sm">
      {message}
    </div>
  );
}
