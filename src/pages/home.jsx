import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    navigate("/login");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex bg-blue-100 flex-col items-center justify-center h-screen">
      <h1 className="text-4xl mb-12 font-bold text-center mb-1">
        Welcome, {user ? user.username : "Guest"}! {user ? null : <p className="text-xl font-medium">Please Login to Start the Quiz</p>}
        
      </h1>
      {user ? (
        <div className="bg-white px-24 pb-16 pt-9 rounded shadow-md text-center">
          <h2 className="text-2xl mb-10 font-medium">Ready to Start the Quiz?</h2>
          <button onClick={() => navigate("/quiz")} className="w-full p-2 mb-4 bg-blue-600 font-medium text-white rounded-md">Start Quiz</button>
          <button onClick={handleLogout} className="w-full p-2 bg-red-600  text-white font-medium rounded-md">Logout</button>
        </div> ) : ( <button onClick={() => navigate("/login")} className="px-20 py-2 bg-blue-600 text-ml font-medium text-white rounded">Login</button> )}
    </div>
  );
}

export default HomePage;
