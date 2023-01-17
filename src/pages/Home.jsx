// src/pages/home.js
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => {
          navigate("/Detail");
        }}
      >
        Detail로 이동
      </button>
      <button
        onClick={() => {
          navigate("/Write");
        }}
      >
        Write로 이동
      </button>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        SignIn으로 이동
      </button>
      <button
        onClick={() => {
          navigate("/SignUp");
        }}
      >
        SignUp으로 이동
      </button>
    </div>
  );
};

export default Home;
