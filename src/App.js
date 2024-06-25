import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import CoinPage from './pages/CoinPage';
import Header from './components/Header';

function App() {
  const appStyles = {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  };

  return (
    <BrowserRouter>
      <div style={appStyles}>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
