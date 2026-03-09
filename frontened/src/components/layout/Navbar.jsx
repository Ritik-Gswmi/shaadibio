import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Navbar({ onToggle }) {

  const { logout } = useContext(AuthContext);

  return (
    <div className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">

      <div className="flex items-center">
        <button onClick={onToggle} className="mr-4">☰</button>
        <h1 className="text-xl font-bold">ShaadiBio</h1>
      </div>

      <button
        onClick={logout}
        className="bg-white text-blue-600 px-3 py-1 rounded"
      >
        Logout
      </button>

    </div>
  );
}

export default Navbar;