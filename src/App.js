import { useBusRoutes } from './controllers/busRouteController';
import { Routes, Route } from 'react-router-dom';
import Layout from './views/Layout/Layout';
import Home from './views/Components/Home/Home';
import Book from './views/Components/Book/Book';
import Contact from './views/Components/Contact/Contact';
import Manage from './views/Components/Manage/Manage';
import Loading from './views/Components/Loading/Loading';
import { ToastContainer } from 'react-toastify';
import AppRoutes from './routes/AppRoutes';

function App() {

  const { busRoutes, loading, setBusRoutes } = useBusRoutes();

  return (
    <>
      {loading ? <Loading loading={loading} /> : 
          <div className="App">     
            <AppRoutes busRoutes={busRoutes} setBusRoutes={setBusRoutes} />
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        }
    </>
    
  );
}

export default App;
