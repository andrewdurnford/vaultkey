import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Signup } from "../pages/Signup";
import { Login } from "../pages/Login";
import { Items } from "../pages/Items";
import { Logout } from "../pages/Logout";
import { Container } from "./Container";
import { Navbar } from "./Navbar";
import { Item } from "../pages/Item";

function App() {
  const { token } = useAuth();

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {token ? (
          <>
            <Route index element={<Container>Hello World</Container>} />
            <Route path="/vault" element={<Items />} />
            <Route path="/vault/:itemId" element={<Item />} />
            <Route path="logout" element={<Logout />} />
          </>
        ) : (
          <>
            <Route index element={<Container>Hello World</Container>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
