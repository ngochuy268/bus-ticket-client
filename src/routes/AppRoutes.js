// src/routes/Routes.js
import { Routes, Route } from 'react-router-dom';
import Layout from '../views/Layout/Layout';
import Home from '../views/Components/Home/Home';
import Book from '../views/Components/Book/Book';
import Contact from '../views/Components/Contact/Contact';
import Manage from '../views/Components/Manage/Manage';

const AppRoutes = ({ busRoutes, setBusRoutes }) => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home busRoutes={busRoutes} />} />
        <Route path="/book" element={<Book busRoutes={busRoutes} setBusRoutes={setBusRoutes}/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/manage" element={<Manage busRoutes={busRoutes} setBusRoutes={setBusRoutes}/>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
