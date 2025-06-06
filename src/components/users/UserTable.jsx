import { useState } from "react"; 

export default function UserTable({ users, onDeactivate, loadingId }) {
    const [deactivateTarget, setDeactivateTarget] = useState(null);

    function handleDeactivateClick(user) {
        setDeactivateTarget(user);
        document.getElementById("deactivate_user_modal").showModal();
    }

    function confirmDeactivation() {
        if (deactivateTarget) {
            onDeactivate(deactivateTarget);
            setDeactivateTarget(null);
            document.getElementById("deactivate_user_modal").close();
        }
    }

    return (
        <>
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <th>{user.id}</th>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <span
                                    className={`badge ${
                                        user.status === "active"
                                            ? "badge-success"
                                            : "badge-error"
                                    }`}
                                >
                                    {user.status}
                                </span>
                            </td>
                            <td className="flex gap-2">
                                <button
                                    className="btn btn-sm btn-error"
                                    onClick={() => handleDeactivateClick(user)}
                                    disabled={loadingId === user.id}
                                >
                                    {loadingId === user.id ? (
                                        <span className="loading loading-spinner"></span>
                                    ) : (
                                        "Deactivate"
                                    )}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Deactivation Confirmation Modal */}
            <dialog id="deactivate_user_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Confirm Deactivation</h3>
                    <p className="py-4">
                        Are you sure you want to deactivate user:
                        <span className="font-semibold ms-2">
                            {deactivateTarget?.first_name ??
                                deactivateTarget?.id}
                        </span>
                        ?
                    </p>
                    <div className="modal-action">
                        <form method="dialog" className="flex gap-2">
                            <button className="btn">No</button>
                            <button
                                type="button"
                                className="btn btn-error"
                                onClick={confirmDeactivation}
                            >
                                Deactivate
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
}
