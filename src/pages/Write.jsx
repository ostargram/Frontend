// src/pages/home.js
import { useNavigate } from "react-router-dom";

const Write = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        navigate("/Home");
      }}
    >
      Home으로 이동
    </button>
  );
};

export default Write;
