import UserTable from "../../components/users/UserTable";
import { getAllUsers, deactivateUser } from "../../utils/auth";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loadingId, setLoadingId] = useState(null);

    const handleDeactivate = async (userToDeactivate) => {
        setLoadingId(userToDeactivate.id);
        try {
            const response = await deactivateUser(userToDeactivate.id);
            setUsers((prev) =>
                prev.map((user) =>
                    user.id === userToDeactivate.id
                        ? { ...user, ...response.user }
                        : user
                )
            );
            toast.success(`User ${userToDeactivate.email} deactivated.`);
        } catch (error) {
            console.log(error);
            toast.error("Failed to deactivate user.");
        } finally {
            setLoadingId(null);
        }
    };

    useEffect(() => {
        async function fetchUsers() {
            try {
                const users = await getAllUsers();
                setUsers(users);
            } catch (err) {
                console.error(err);
                toast.error("Failed to load users.");
            }
        }

        fetchUsers();
    }, []);

    return (
        <div className="flex flex-col bg-base-300 rounded-md p-4">
            <div className="overflow-x-auto">
                <UserTable
                    users={users}
                    onDeactivate={handleDeactivate}
                    loadingId={loadingId}
                />
            </div>
        </div>
    );
}
