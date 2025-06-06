import { useState } from "react";
import { toast } from "sonner";

export default function SlotTable({ locations, slots, onEdit, onDelete }) {
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleDeleteClick(slot) {
    setDeleteTarget(slot);
    document.getElementById("delete_slot_modal")?.showModal();
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setLoading(true);
    try {
      await onDelete(deleteTarget);
      toast.success(`Deleted slot "${deleteTarget.name}"`);
      document.getElementById("delete_slot_modal")?.close();
    } catch (error) {
      toast.error("Failed to delete slot.");
      console.error(error);
    } finally {
      setLoading(false);
      setDeleteTarget(null);
    }
  }

  return (
    <>
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Location</th>
            <th>Is Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((slot) => (
            <tr key={slot.id}>
              <th>{slot.id}</th>
              <td>{slot.name}</td>
              <td>
                {locations.find((loc) => loc.id === slot.location_id)?.name}
              </td>
              <td>
                {slot.is_available ? (
                  <span className="badge badge-success">Yes</span>
                ) : (
                  <span className="badge badge-error">Not Available</span>
                )}
              </td>
              <td className="flex gap-2">
                <button className="btn btn-sm btn-info" onClick={() => onEdit(slot)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-error" onClick={() => handleDeleteClick(slot)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <dialog id="delete_slot_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Deletion</h3>
          <p className="py-4">
            Are you sure you want to delete{" "}
            <span className="font-semibold">{deleteTarget?.name}</span>?
          </p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              <button type="button" className="btn" disabled={loading}>
                Cancel
              </button>
              <button
                type="button"
                className={`btn btn-error ${loading ? "loading" : ""}`}
                onClick={confirmDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
