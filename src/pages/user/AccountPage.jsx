import { useEffect, useState } from "react";
import { useAuthStore } from "../../stores/useAuthStore";
import { getUser, updateUserProfile, updatePassword } from "../../utils/auth";
import { toast } from "sonner";

export default function AccountPage() {
  const logout = useAuthStore((state) => state.logout);
  const [user, setUser] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getUser();
        setUser(user);
        setFirstName(user.first_name || "");
        setLastName(user.last_name || "");
      } catch (error) {
        console.error(error);
        toast.error("Failed to load user data.");
      }
    }

    fetchUser();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    try {
      const updatedUser = await updateUserProfile({
        first_name: firstName,
        last_name: lastName,
      });
      setUser(updatedUser);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return toast.error("New passwords do not match.");
    }
    setPasswordLoading(true);
    try {
      await updatePassword({ old_password: oldPassword, new_password: newPassword });
      toast.success("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update password.");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="p-4 h-full flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Account Profile</h2>
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 w-full max-w-lg">
        <form onSubmit={handleProfileUpdate}>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">First name</legend>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input w-full"
              placeholder="Type here"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Last name</legend>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input w-full"
              placeholder="Type here"
            />
          </fieldset>

          <button
            type="submit"
            className="btn btn-primary w-full mt-4"
            disabled={profileLoading}
          >
            {profileLoading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center mt-8">Security</h2>
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 w-full max-w-lg">
        <form onSubmit={handlePasswordChange}>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Old password</legend>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="input w-full"
              placeholder="Type here"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">New password</legend>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input w-full"
              placeholder="Type here"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Confirm New password</legend>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input w-full"
              placeholder="Type here"
            />
          </fieldset>

          <button
            type="submit"
            className="btn btn-primary w-full mt-4"
            disabled={passwordLoading}
          >
            {passwordLoading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>

      <button
        type="button"
        onClick={logout}
        className="btn btn-primary w-full mt-4"
      >
        Logout
      </button>
    </div>
  );
}
