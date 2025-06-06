import { useRef, useState, useEffect } from "react";
import { toast } from "sonner";

export default function AdminReservationTable({ reservations, onCancel }) {
    const [cancelTarget, setCancelTarget] = useState(null);
    const [loadingId, setLoadingId] = useState(null);

    function handleCancelClick(res) {
        setCancelTarget(res);
        document.getElementById("cancel_reservation_modal").showModal();
    }

    async function confirmCancelation() {
        if (cancelTarget) {
            setLoadingId(cancelTarget.id);
            try {
                await onCancel(cancelTarget);
                toast.success(`Reservation #${cancelTarget.id} cancelled.`);
            } catch (err) {
                toast.error("Failed to cancel reservation.");
            } finally {
                setLoadingId(null);
                setCancelTarget(null);
                document.getElementById("cancel_reservation_modal").close();
            }
        }
    }

    function getStatusBadge(status) {
        const badgeMap = {
            in_progress: "badge badge-info",
            completed: "badge badge-success",
            no_show: "badge badge-warning",
            cancelled: "badge badge-error",
        };

        return (
            <span className={badgeMap[status] || "badge"}>
                {status.replace("_", " ")}
            </span>
        );
    }

    return (
        <>
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Slot</th>
                        <th>User</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((res) => (
                        <tr key={res.id}>
                            <th>{res.id}</th>
                            <td>{res.slot_name}</td>
                            <td>{res.user_email}</td>
                            <td>{res.start_time}</td>
                            <td>{res.end_time}</td>
                            <td>{getStatusBadge(res.status)}</td>
                            <td className="flex gap-2">
                                <button
                                    className="btn btn-sm btn-error"
                                    onClick={() => handleCancelClick(res)}
                                    disabled={loadingId === res.id}
                                >
                                    {loadingId === res.id ? (
                                        <span className="loading loading-spinner loading-xs" />
                                    ) : (
                                        "Cancel"
                                    )}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <dialog id="cancel_reservation_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Confirm Cancelation</h3>
                    <p className="py-4">
                        Are you sure you want to cancel reservation:{" "}
                        <span className="font-semibold ms-2">
                            #{cancelTarget?.id}
                        </span>
                        ?
                    </p>
                    <div className="modal-action">
                        <form method="dialog" className="flex gap-2">
                            <button className="btn">No</button>
                            <button
                                type="button"
                                className="btn btn-error"
                                onClick={confirmCancelation}
                                disabled={loadingId === cancelTarget?.id}
                            >
                                {loadingId === cancelTarget?.id ? (
                                    <span className="loading loading-spinner loading-sm" />
                                ) : (
                                    "Cancel Reservation"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
}
