import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Chart as ChartJS, BarElement, RadialLinearScale, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend, Title, SubTitle } from 'chart.js';

import HomePage from './pages/HomePage';
import Form from './pages/Form';
import DashBoard from './pages/DashBoard';
import Report from './pages/Report';
import NotFound from './pages/NotFound';
ChartJS.register(BarElement, RadialLinearScale, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/form' element={<Form />} />
        <Route path='/dashboard' element={<DashBoard />} />
        <Route path='/report' element={<Report />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
