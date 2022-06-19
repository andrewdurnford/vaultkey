import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Signup } from "../pages/Signup";
import { Login } from "../pages/Login";
import { Items } from "../pages/Items";
import { Logout } from "../pages/Logout";
import { Main } from "./Main";
import { Navbar } from "./Navbar";

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
            <Route index element={<Main>Hello World</Main>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
