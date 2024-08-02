import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import HomePage from './pages/home';
import QuizPage from './pages/quiz';


function App() {
  return (
    <div className="App">
      <div className="bg-slate-700">
        
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        
        
      </Routes>
    </div>
  );
}

export default App;
