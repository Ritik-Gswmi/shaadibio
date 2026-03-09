import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { API_URL , getAuthHeaders } from "../../utils/api";

function ProfileForm() {
  const { user, login } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ name, email })
      });
      const data = await res.json();
      if (res.ok) {
        // preserve existing token from context
        login({ user: data, token: localStorage.getItem("token") });
        alert("Profile updated");
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to update");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Edit Profile</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full rounded"
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full rounded"
          placeholder="Email"
          required
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
}

export default ProfileForm;