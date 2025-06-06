import { useState } from "react";

export default function LocationTable({ locations, onEdit, onDelete }) {
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  function handleDeleteClick(loc) {
    setDeleteTarget(loc);
    document.getElementById("delete_modal")?.showModal();
  }

  async function confirmDelete() {
    if (deleteTarget) {
      try {
        setIsDeleting(true);
        await onDelete(deleteTarget);
      } finally {
        setIsDeleting(false);
        setDeleteTarget(null);
        document.getElementById("delete_modal")?.close();
      }
    }
  }

  return (
    <>
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Address</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Slots</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((loc) => (
            <tr key={loc.id}>
              <th>{loc.id}</th>
              <td>{loc.name}</td>
              <td>{loc.address}</td>
              <td>{loc.latitude}</td>
              <td>{loc.longitude}</td>
              <td>{loc.total_slots}</td>
              <td className="flex gap-2">
                <button className="btn btn-sm btn-info" onClick={() => onEdit(loc)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-error" onClick={() => handleDeleteClick(loc)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Deletion</h3>
          <p className="py-4">
            Are you sure you want to delete{" "}
            <span className="font-semibold">{deleteTarget?.name}</span>?
          </p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              <button className="btn" disabled={isDeleting}>Cancel</button>
              <button
                type="button"
                className="btn btn-error"
                onClick={confirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
