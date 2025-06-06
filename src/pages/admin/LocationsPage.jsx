import { useState, useEffect } from "react";
import LocationModal from "../../components/locations/LocationModal";
import LocationTable from "../../components/locations/LocationTable";
import { addLocation, getAllLocations, deleteLocation, updateLocation } from "../../utils/location";
import { toast } from "sonner";

export default function LocationsPage() {
  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState({ name: "", address: "", latitude: "", longitude: "" });
  const [isModalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const openCreateModal = () => {
    setFormData({ name: "", address: "", latitude: "", longitude: "" });
    setEditMode(false);
    setEditId(null);
    setModalOpen(true);
  };

  const openEditModal = (location) => {
    setFormData(location);
    setEditMode(true);
    setEditId(location.id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditMode(false);
    setEditId(null);
  };

  const handleSave = async () => {
    setModalLoading(true);
    try {
      if (editMode) {
        const updatedLocation = await updateLocation(editId, formData);
        setLocations((prev) =>
          prev.map((loc) => (loc.id === editId ? { ...loc, ...updatedLocation.location } : loc))
        );
        toast.success("Location updated successfully!");
      } else {
        const location = await addLocation(formData);
        setLocations((prev) => [...prev, location.location]);
        toast.success("Location added successfully!");
      }
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save location.");
    } finally {
      setModalLoading(false);
    }
  };

  const handleDelete = async (location) => { 
    setLoading(true);
    try {
      await deleteLocation(location.id);
      setLocations((prev) => prev.filter((loc) => loc.id !== location.id));
      toast.success("Location deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete location.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    async function fetchLocations() {
      try {
        const locations = await getAllLocations();
        setLocations(locations);
      } catch (err) {
        console.error(err);
        toast.error("Could not load locations.");
      } finally {
        setLoading(false);
      }
    }
    fetchLocations();
  }, []);

  return (
    <div className="flex flex-col bg-base-300 rounded-md p-4">
      <div className="flex justify-end mb-4">
        <button className="btn btn-primary" onClick={openCreateModal} disabled={loading || modalLoading}>
          Add
        </button>
      </div>
      <div className="overflow-x-auto">
        <LocationTable locations={locations} onEdit={openEditModal} onDelete={handleDelete} loading={loading} />
      </div>
      <LocationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSave}
        formData={formData}
        setFormData={setFormData}
        editMode={editMode}
        loading={modalLoading}
      />
    </div>
  );
}
