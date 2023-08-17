import logo from './logo.svg';
import './App.css';
import Reviews from './reviews/Reviews';
import { ToastContainer, toast } from 'react-toastify';
import PublicRoutes from './routes/PublicRoutes';

function App() {
  return (<>
   <PublicRoutes/>
   
   <ToastContainer
position="top-right"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/></>
  );
}

export default App;
