import { useState, useEffect } from "react";
import { getAllReservations, cancelReservation } from "../../utils/reservation";
import { toast } from 'sonner';

export default function ReservationPage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState(null);

  useEffect(() => {
    async function fetchReservations() {
      try {
        const data = await getAllReservations();
        setReservations(data);
      } catch (error) {
        console.error("Failed to fetch reservations", error);
        toast.error("Failed to load reservations. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchReservations();
  }, []);

  const handleCancel = async (reservationId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this reservation?");
    if (!confirmCancel) return;

    try {
      setCancelingId(reservationId);
      await cancelReservation(reservationId);
      setReservations((prev) =>
        prev.map((r) =>
          r.id === reservationId ? { ...r, status: "cancelled" } : r
        )
      );
      toast.success("Reservation cancelled successfully.");
    } catch (error) {
      console.error("Cancel failed", error);
      toast.error("Failed to cancel reservation. Please try again.");
    } finally {
      setCancelingId(null);
    }
  };

  return (
    <div className="p-4 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Your Reservations</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading reservations...</p>
      ) : reservations.length === 0 ? (
        <p className="text-center text-gray-600">No reservations found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reservations.map((res) => (
            <div
              key={res.id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {res.location_name ?? ""} Slot: {res.slot_name}
              </h3>
              <p className="text-gray-600 mb-1">
                Start:{" "}
                <span className="font-medium">
                  {new Date(res.start_time).toLocaleString()}
                </span>
              </p>
              <p className="text-gray-600 mb-1">
                End:{" "}
                <span className="font-medium">
                  {new Date(res.end_time).toLocaleString()}
                </span>
              </p>

              <p
                className={`font-bold mb-2 ${
                  res.status === "active"
                    ? "text-green-600"
                    : res.status === "cancelled"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                Status: {res.status}
              </p>

              {res.status !== "cancelled" && (
                <div className="flex flex-row gap-2">

                <button
                  onClick={() => handleCancel(res.id)}
                  disabled={cancelingId === res.id}
                  className="mt-2 w-1/2 btn btn-error"
                  >
                  {cancelingId === res.id ? "Cancelling..." : "Cancel"}
                </button>
                <button
                  onClick={() => handleCancel(res.id)}
                  disabled={cancelingId === res.id}
                  className="mt-2 w-1/2  btn btn-success"
                  >
                  {cancelingId === res.id ? "Completing..." : "Complete"}
                </button>
                
                  </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
