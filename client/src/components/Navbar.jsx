import React, { useContext } from 'react'
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContext';

const Navbar = () => {

    const navigate = useNavigate();
    const usertype = localStorage.getItem('userType');

    const {logout} = useContext(GeneralContext);

  return (
    <>
        <div className="navbar">

        {!usertype ? 
            <>
                <h3 >SB Stocks</h3>

                <div className="nav-options" >

                <ul>
                    <li className='header-li'><a href="#home">Home</a></li>
                    <li className='header-li'><a href="#about">About</a> </li>
                    <li className='header-li'><a href="#home">Join now</a></li>
                </ul>

                </div>
            </>
        :
        
        <>
        {usertype === 'customer' ? 
        
        <>
            <h3 >SB Stocks</h3>

            <div className="nav-options" >

                <p onClick={()=>navigate('/home')}>Home</p>
                <p onClick={()=>navigate('/portfolio')}>Portfolio</p>
                <p onClick={()=>navigate('/history')}>History</p>
                <p onClick={()=>navigate('/profile')}>Profile</p>
                <p onClick={logout}>Logout</p>

            </div>
        </>
            :  usertype === 'admin' ?

                    <>
                        <h3 >SB Stocks (Admin)</h3>
                        <div className="nav-options" >

                            <p onClick={()=>navigate('/admin')}>Home</p>
                            <p onClick={()=>navigate('/users')}>Users</p>
                            <p onClick={()=>navigate('/all-orders')}>Orders</p>
                            <p onClick={()=>navigate('/all-transactions')}>Transactions</p>
                            <p onClick={logout}>Logout</p>
                        </div> 
                    </>
            
                :

                    ""

        }
        </>}

        



            

        </div>
    
    </>
  )
}

export default Navbar