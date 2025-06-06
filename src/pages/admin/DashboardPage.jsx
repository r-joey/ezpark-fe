import { useEffect, useState } from "react";
import { dashboardAnalytics } from "../../utils/auth";

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    dashboardAnalytics()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load dashboard summary");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading dashboard summary...</p>;
  if (error) return <p className="text-error">{error}</p>;

  const { users, locations, slots, reservations } = data;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard Summary</h1>

      {/* Users */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card title="Total Users" value={users.total} />
          <Card title="Active Users" value={users.active} />
        </div>
      </section>

      {/* Locations */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Locations</h2>
        <Card title="Total Locations" value={locations.total} />
      </section>

      {/* Slots */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Slots</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card title="Total Slots" value={slots.total} />
          <Card title="Available Slots" value={slots.available} />
        </div>
      </section>

      {/* Reservations */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Reservations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card title="Total Reservations" value={reservations.total} />
          <Card title="Active Reservations" value={reservations.active} />
        </div>
        {reservations.most_reserved_slot && (
          <div className="mt-4 p-4 bg-base-200 rounded-md border border-base-300">
            <h3 className="font-semibold mb-2">Most Reserved Slot</h3>
            <p>Slot ID: {reservations.most_reserved_slot.slot_id}</p>
            <p>Reservations: {reservations.most_reserved_slot.reservation_count}</p>
          </div>
        )}
      </section>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-base-200 p-4 rounded-md shadow-sm border border-base-300">
      <h3 className="font-semibold mb-1">{title}</h3>
      <div className="text-lg">{value}</div>
    </div>
  );
}
