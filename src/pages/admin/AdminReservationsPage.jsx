import AdminReservationTable from "../../components/reservations/AdminReservationTable";
import { useEffect, useState } from "react";
import { getAllReservations, cancelReservation, completeReservation } from "../../utils/reservation";
import { toast } from "sonner";

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCancel = async (reservation) => {
    try {
      const updated = await cancelReservation(reservation.id);
      setReservations((prev) =>
        prev.map((res) =>
          res.id === reservation.id ? { ...res, ...updated.reservation } : res
        )
      );
      toast.success(`Reservation cancelled.`);
    } catch (error) {
      toast.error("Failed to cancel reservation.");
      console.error(error);
    }
  };

  const handleComplete = async (reservation) => {
    try {
      const updated = await completeReservation(reservation.id);
      console.log(updated)
      setReservations((prev) =>
        prev.map((res) =>
          res.id === reservation.id ? { ...res, ...updated.reservation } : res
        )
      );
      toast.success(`Reservation completed.`);
    } catch (error) {
      toast.error("Failed to complete reservation.");
      console.error(error);
    }
  };

  useEffect(() => {
    async function fetchReservations() {
      setLoading(true);
      try {
        const reservations = await getAllReservations();
        setReservations(reservations);
      } catch (err) {
        toast.error("Failed to load reservations.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchReservations();
  }, []);

  return (
    <div className="flex flex-col bg-base-300 rounded-md p-4">
      <h2 className="text-2xl font-bold mb-4">Reservations</h2>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <AdminReservationTable reservations={reservations} onComplete={handleComplete} onCancel={handleCancel} />
        </div>
      )}
    </div>
  );
}
