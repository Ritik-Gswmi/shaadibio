function Sidebar({ setActiveSection }) {
  return (
    <div className="w-64 bg-gray-100 p-4">

      <h2 className="text-xl font-bold mb-4">Sections</h2>

      <ul className="space-y-3">

        <li>
          <button onClick={() => setActiveSection("personal")}>
            Personal Details
          </button>
        </li>

        <li>
          <button onClick={() => setActiveSection("family")}>
            Family Details
          </button>
        </li>

        <li>
          <button onClick={() => setActiveSection("education")}>
            Education
          </button>
        </li>

        <li>
          <button onClick={() => setActiveSection("horoscope")}>
            Horoscope
          </button>
        </li>

        <li>
          <button onClick={() => setActiveSection("photo")}>
            Upload Photo
          </button>
        </li>
        <li>
          <button onClick={() => setActiveSection("profile")}> 
            Edit Profile
          </button>
        </li>
        <li>
          <button onClick={() => setActiveSection("password")}> 
            Change Password
          </button>
        </li>
        <li>
          <button onClick={() => setActiveSection("preview")}> 
            Preview
          </button>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;