import { useState, useEffect } from "react";
import { getAllLocations } from "../../utils/location";
import { addSlot, getAllSlots, deleteSlot, updateSlot } from "../../utils/slot";
import SlotTable from "../../components/slots/SlotTable";
import SlotModal from "../../components/slots/SlotModal";

export default function SlotsPage() {
  const [locations, setLocations] = useState([]);
  const [slots, setSlots] = useState([]);
  const [formData, setFormData] = useState({ location_id: "", name: "" });
  const [isModalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const openCreateModal = () => {
    setFormData({ name: "", location_id: "" });
    setEditMode(false);
    setModalOpen(true);
  };

  const openEditModal = (slot) => {
    setFormData(slot);
    setEditMode(true);
    setEditId(slot.id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditMode(false);
    setEditId(null);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (editMode) {
        const updatedSlot = await updateSlot(editId, formData);
        setSlots((prev) =>
          prev.map((slot) =>
            slot.id === editId ? { ...slot, ...updatedSlot.slot } : slot
          )
        );
      } else {
        const response = await addSlot(formData);
        setSlots((prev) => [...prev, response.slot]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  const handleDelete = async (slot) => {
    try {
      await deleteSlot(slot.id);
      setSlots((prev) => prev.filter((s) => s.id !== slot.id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [fetchedSlots, fetchedLocations] = await Promise.all([
          getAllSlots(),
          getAllLocations(),
        ]);
        setSlots(fetchedSlots);
        setLocations(fetchedLocations);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex flex-col bg-base-300 rounded-md p-4">
      <div className="flex justify-end mb-4">
        <button className="btn btn-primary" onClick={openCreateModal}>
          Add
        </button>
      </div>
      <div className="overflow-x-auto">
        <SlotTable
          locations={locations}
          slots={slots}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />
      </div>
      <SlotModal
        locations={locations}
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSave}
        formData={formData}
        setFormData={setFormData}
        editMode={editMode}
      />
    </div>
  );
}
