import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { API_URL , getAuthHeaders } from "../../utils/api";

function ChangePasswordForm() {
  const { user } = useContext(AuthContext);
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/auth/me/password`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ currentPassword: current, newPassword: newPass })
      });
      const data = await res.json();
      if (res.ok) {
        alert("Password changed");
        setCurrent("");
        setNewPass("");
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to change password");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Change Password</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="Current password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="password"
          placeholder="New password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Change
        </button>
      </form>
    </div>
  );
}

export default ChangePasswordForm;