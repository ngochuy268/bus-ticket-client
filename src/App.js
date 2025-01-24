import { useBusRoutes } from './controllers/busRouteController';
import Loading from './views/Components/Loading/Loading';
import { ToastContainer } from 'react-toastify';
import AppRoutes from './routes/AppRoutes';

function App() {
  const { routes, busRoutes, loading, setBusRoutes } = useBusRoutes();

  return (
    <>
      {loading ? <Loading loading={loading} /> : 
          <div className="App">     
            <AppRoutes 
              busRoutes={busRoutes} 
              routes={routes} 
              setBusRoutes={setBusRoutes} 
            />
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
