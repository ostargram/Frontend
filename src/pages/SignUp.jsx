// src/pages/home.js
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        navigate("/");
      }}
    >
      Home으로 이동
    </button>
  );
};

export default Home;
