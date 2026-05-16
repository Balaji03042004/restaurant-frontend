import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function LoginSuccess() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      login(token); // updates context state + localStorage
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate, login]);

  return <p>Logging you in...</p>;
}

export default LoginSuccess;