import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Auth/Login.jsx";
import SignUp from "./pages/Auth/SignUp.jsx";
import LogoutButton from "./pages/Auth/components/Logout";

function App() {
  return (
    <BrowserRouter>
      <nav className="flex items-center gap-4 p-4 bg-gray-900 text-white">
        <Link to="/login" className="hover:underline">
          Login
        </Link>
        <Link to="/signup" className="hover:underline">
          Signup
        </Link>
        <div className="ml-auto">
          <LogoutButton />
        </div>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
