import useAuth from "../hooks/useAuth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { Items } from "./Items";
import { Navbar } from "./Navbar";
import { Logout } from "./Logout";

function App() {
  const { token } = useAuth();

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {token ? (
          <>
            <Route index element={<Items />} />
            <Route path="logout" element={<Logout />} />
          </>
        ) : (
          <>
            <Route index element={<main>Hello World</main>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
