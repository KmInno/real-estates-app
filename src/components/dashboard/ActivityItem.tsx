type ActivityItemProps = {
  title: string;
  description: string;
  time: string;
};

export default function ActivityItem({ title, description, time }: ActivityItemProps) {
  return (
    <div className="rounded-2xl bg-black/20 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-medium text-white">{title}</div>
          <div className="mt-1 text-sm text-white/60">{description}</div>
        </div>
        <div className="text-xs text-white/45">{time}</div>
      </div>
    </div>
  );
}
