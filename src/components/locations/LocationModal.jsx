import { useRef, useEffect } from "react";

export default function LocationModal({ isOpen, onClose, onSubmit, formData, setFormData, editMode, loading }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) modalRef.current?.showModal();
    else modalRef.current?.close();
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loading) {
      onSubmit();
    }
  };

  return (
    <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="text-lg font-bold text-center mb-4">
          {editMode ? "Edit Location" : "Add New Location"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input w-full"
            placeholder="Name"
            disabled={loading}
            required
          />
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="textarea w-full h-24"
            placeholder="Address"
            disabled={loading}
            required
          />
          <input
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            className="input w-full"
            placeholder="Latitude"
            disabled={loading}
            required
            type="number"
            step="any"
          />
          <input
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            className="input w-full"
            placeholder="Longitude"
            disabled={loading}
            required
            type="number"
            step="any"
          />
          <div className="modal-action">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className="btn"
              onClick={onClose}
              disabled={loading}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
