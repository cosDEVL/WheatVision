import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Form from "./components/Form";
import DashBoard from "./components/DashBoard";
import Report from "./components/Report";


import { Chart as ChartJS, BarElement, RadialLinearScale, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Title, SubTitle } from 'chart.js';
ChartJS.register(BarElement, RadialLinearScale, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/form' element={<Form />} />
        <Route path='/dashboard' element={<DashBoard />} />
        <Route path='/report' element={<Report />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
