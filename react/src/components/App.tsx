import useAuth from "../hooks/useAuth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { Link } from "react-router-dom";

function App() {
  const { token } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {token ? (
          <>
            <Route index element={<div>Hello World</div>} />
          </>
        ) : (
          <>
            <Route
              index
              element={
                <>
                  <ul>
                    <li>
                      <Link to="/login">Log in</Link>
                    </li>
                    <li>
                      <Link to="signup">Sign up</Link>
                    </li>
                  </ul>
                </>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
