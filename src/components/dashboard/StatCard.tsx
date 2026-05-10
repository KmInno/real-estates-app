type StatCardProps = {
  title: string;
  value: string;
  note?: string;
};

export default function StatCard({ title, value, note }: StatCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg">
      <p className="text-sm text-white/50">{title}</p>
      <h3 className="mt-3 text-4xl font-bold text-white">{value}</h3>
      {note ? <p className="mt-2 text-sm text-white/60">{note}</p> : null}
    </div>
  );
}
