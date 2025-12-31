import API from "../../../api/api.js";

export default function LogoutButton() {
  const logout = async () => {
    try {
      await API.post("/auth/logout");
      alert("Logged out");
    } catch {
      alert("Logout failed");
    }
  };

  return (
    <button
      onClick={logout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
}
