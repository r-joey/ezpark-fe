import { useRef, useEffect, useState } from "react";
import { toast } from "sonner";

export default function SlotModal({
  locations,
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
  editMode,
}) {
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) modalRef.current?.showModal();
    else modalRef.current?.close();
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit();
      toast.success(editMode ? "Slot updated successfully!" : "Slot added successfully!");
      onClose();
    } catch (err) {
      toast.error("Failed to save slot");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="text-lg font-bold text-center">
          {editMode ? "Edit Slot" : "Add New Slot"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input w-full"
            placeholder="Slot Name"
            required
          />

          <select
            name="location_id"
            value={formData.location_id || ""}
            onChange={handleChange}
            className="select w-full"
            required
          >
            <option value="" disabled>
              Select a location
            </option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>

          <label className="label gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="is_available"
              checked={formData.is_available || false}
              onChange={handleChange}
              className="checkbox"
            />
            <span className="label-text text-base-content">Is Available</span>
          </label>

          <div className="modal-action">
            <button
              type="submit"
              className={`btn btn-primary ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button type="button" className="btn" onClick={onClose} disabled={loading}>
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
