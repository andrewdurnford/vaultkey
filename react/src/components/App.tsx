import useAuth from "../hooks/useAuth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./Signup";

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {user ? (
          <></>
        ) : (
          <>
            <Route index element={<Signup />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
