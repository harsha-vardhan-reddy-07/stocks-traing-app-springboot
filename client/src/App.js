import './App.css';
import {Routes, Route} from 'react-router-dom'; 
import Home from './pages/Home.jsx';
import Landing from './pages/Landing';
import LoginProtector from './RouteProtectors/AuthProtector';
import AuthProtector from './RouteProtectors/LoginProtector';
import Admin from './pages/Admin';
import Portfolio from './pages/Portfolio';
import History from './pages/History';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import StockChart from './pages/StockChart';
import Users from './pages/Users'
import AllOrders from './pages/AllOrders'
import AllTransactions from './pages/AllTransactions'
import AdminStockChart from './pages/AdminStockChart';


function App() {


  return (

    <div className="App">


      <Navbar />
     

      <Routes>
        <Route exact path='' element={<LoginProtector> <Landing /> </LoginProtector> } />
        <Route  path='/home' element={<AuthProtector><Home /></AuthProtector>} />
        <Route  path='/portfolio' element={<AuthProtector><Portfolio /></AuthProtector>} />
        <Route  path='/history' element={<AuthProtector><History /></AuthProtector>} />
        <Route  path='/profile' element={<AuthProtector><Profile /></AuthProtector>} />
        <Route  path='/stock/:id' element={<AuthProtector><StockChart /></AuthProtector>} />

        <Route  path='/admin' element={ <AuthProtector><Admin /></AuthProtector>} />
        <Route  path='/users' element={ <AuthProtector><Users /></AuthProtector>} />
        <Route  path='/all-orders' element={ <AuthProtector><AllOrders /></AuthProtector>} />
        <Route  path='/all-transactions' element={ <AuthProtector><AllTransactions /></AuthProtector>} />
        <Route  path='/admin-stock/:id' element={<AuthProtector><AdminStockChart /></AuthProtector>} />

      </Routes>
    </div>
  );
}

export default App;
