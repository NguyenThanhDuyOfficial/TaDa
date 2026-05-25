export default function DashboardPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Users" value="2,345" change="+12%" />
        <StatCard title="Revenue" value="$45,231" change="+8.2%" />
        <StatCard title="Active Now" value="189" change="+3.1%" />
        <StatCard title="Conversion Rate" value="3.2%" change="-1.2%" />
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  change,
}: {
  title: string;
  value: string;
  change: string;
}) {
  const isPositive = change.startsWith('+');

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
      <p
        className={`mt-2 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}
      >
        {change} from last month
      </p>
    </div>
  );
}
