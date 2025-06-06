import { useEffect, useState } from 'react';
import { getAllLocations } from '../../utils/location';
import LeafletMap from '../../components/Leaflet';
import { io } from 'socket.io-client';
import { createReservation } from '../../utils/reservation';
import { toast } from 'sonner';

export default function HomePage() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onReserve = (location) => {
    setSelectedLocation(location);
    setSelectedSlot(null);
    setStartTime('');
    setEndTime('');
    document.getElementById('reserve_slot_modal').showModal();
  };

  const handleReservationSubmit = async () => {
    if (!selectedSlot || !startTime || !endTime) {
      toast.warning("Please fill out all fields.");
      return;
    }

    setLoading(true);

    try {
      await createReservation({
        slot_id: selectedSlot,
        start_time: startTime,
        end_time: endTime,
      });
      toast.success("Reservation successful!");
      document.getElementById('reserve_slot_modal').close();
    } catch (err) {
      console.error(err);
      toast.error("Reservation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchLocations() {
      try {
        const data = await getAllLocations();
        setLocations(data);
      } catch (err) {
        setError("Failed to load locations");
      }
    }
    fetchLocations();
  }, []);

  useEffect(() => {
    const socket = io('https://ezpark.onrender.com', {
      transports: ['websocket', 'polling'],
    });

    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));
    socket.on('connect_error', (err) => {
      setError(`Connection Error: ${err.message}`);
      setIsConnected(false);
    });

    socket.on('slot_status_update', ({ id, is_available }) => {
      setLocations((prev) =>
        prev.map((loc) => ({
          ...loc,
          slots: loc.slots.map((slot) =>
            slot.id === id ? { ...slot, is_available } : slot
          ),
        }))
      );
    });

    return () => socket.disconnect();
  }, []);

  return (
    <>
      <div className="flex flex-col h-full items-center justify-center p-4">
        {error && <p className="text-red-500">{error}</p>}
        {!isConnected && <p className="text-yellow-500">Connecting to live updates...</p>}
        <LeafletMap locations={locations} onReserve={onReserve} />
      </div>

      <dialog id="reserve_slot_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-2">Reserve a Slot at {selectedLocation?.name}</h3>

          <div className="space-y-2">
            <fieldset className="grid grid-cols-2 gap-2">
              {selectedLocation?.slots
                .filter((slot) => slot.is_available)
                .map((slot) => (
                  <label
                    key={slot.id}
                    className="border rounded p-2 flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="slot"
                      value={slot.id}
                      checked={selectedSlot === slot.id}
                      onChange={() => setSelectedSlot(slot.id)}
                    />
                    <span>{slot.name}</span>
                  </label>
                ))}
            </fieldset>

            <div className="flex flex-col gap-2 mt-4">
              <label className="text-sm font-medium">Start Time</label>
              <input
                type="datetime-local"
                className="input input-bordered w-full"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
              <label className="text-sm font-medium">End Time</label>
              <input
                type="datetime-local"
                className="input input-bordered w-full"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              <button type="button" className="btn" onClick={() => document.getElementById('reserve_slot_modal').close()}>
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary flex items-center gap-2"
                onClick={handleReservationSubmit}
                disabled={loading}
              >
                {loading && <span className="loading loading-spinner loading-sm" />}
                {loading ? 'Reserving...' : 'Reserve Slot'}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
