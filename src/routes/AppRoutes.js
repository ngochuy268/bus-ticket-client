// src/routes/Routes.js
import { Routes, Route } from 'react-router-dom';
import Layout from '../views/Layout/Layout';
import Home from '../views/Components/Home/Home';
import Book from '../views/Components/Book/Book';
import Contact from '../views/Components/Contact/Contact';
import Manage from '../views/Components/Manage/Manage';
import Confirm from '../views/Components/Confirm/Confirm';

const AppRoutes = ({ busRoutes, setBusRoutes, routes }) => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home busRoutes={busRoutes} />} />
        <Route path="/book" element={<Book 
          busRoutes={busRoutes} 
          setBusRoutes={setBusRoutes} 
          routes={routes} 
          />} 
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/manage" element={<Manage busRoutes={busRoutes} setBusRoutes={setBusRoutes}/>} />
        <Route path='/confirm' element={<Confirm 
          busRoutes={busRoutes} 
          setBusRoutes={setBusRoutes} 
         />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
