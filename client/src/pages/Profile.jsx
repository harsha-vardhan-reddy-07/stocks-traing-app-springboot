import React, { useEffect, useState } from 'react'
import '../styles/Profile.css';
import {RiRefund2Line, RiHistoryLine} from 'react-icons/ri'
import {GiCash} from 'react-icons/gi'
import {HiOutlineCurrencyRupee} from 'react-icons/hi'
import {FiCreditCard} from 'react-icons/fi'
import axios from 'axios';

const Profile = () => {


  const [actionType, setActionType] = useState('Transactions');
  const [userData, setUserData] = useState([]);
  

 const userId = localStorage.getItem('userId');
 const username = localStorage.getItem('username');


 useEffect(()=>{
  fetchUser();
 },[])

 const fetchUser = async() =>{
  await axios.get(`http://localhost:6001/fetch-user/${userId}`).then(
    (response)=>{
      setUserData(response.data);
    }
  ).catch((err)=>{
    console.log(err);
  })
 }


  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [depositMode, setDepositMode] = useState('');
  const [withdrawMode, setWithdrawMode] = useState('');

  const [transactions, setTransactions] = useState([]);


  const deposit = async (e)=>{
    e.preventDefault();
    await axios.post('http://localhost:6001/deposit', {user: userId, amount: depositAmount, paymentMode: depositMode}).then(
      (response)=>{
        localStorage.setItem('balance', response.data.balance);
        fetchTransactions();
        setActionType('Transactions');
        setDepositAmount(0);
        setDepositMode('');
        fetchUser();
      }
    ).catch((err)=>{
      alert('Transaction failed!!');
    })
  }


  const withdraw = async (e)=>{
    e.preventDefault();
      await axios.post('http://localhost:6001/withdraw', {user: userId, amount: withdrawAmount, paymentMode: withdrawMode}).then(
        (response)=>{
          localStorage.setItem('balance', response.data.balance);
          fetchTransactions();
          setActionType('Transactions');
          setWithdrawAmount(0);
          setWithdrawMode('');
          fetchUser();  
        }
      ).catch((err)=>{
        alert('Transaction failed!!');
      })
  }


  useEffect(()=>{
    fetchTransactions();
  }, [])

  const fetchTransactions = async()=>{
    await axios.get('http://localhost:6001/transactions').then(
      (response)=>{
        setTransactions(response.data.reverse());
      }
    )
  }




  return (
    <div className="profilePage">
      <h2>My Account</h2>
      <div className="profileBox">
        <div className="profileBox-head">
            <p>{username}</p>
        </div>
        <div className="profileBox-body">
            <span>
              <p>Trading balance</p>
              <h6>$ {userData ? userData.balance : 0}</h6>
            </span>
            <div className="cash-actions">
              <button className={actionType === 'AddFunds' ? 'cash-actions-active' : 'cash-actions-inactive'} onClick={()=>setActionType('AddFunds')}><RiRefund2Line  className='cash-action-icons'/>  Add Funds</button>
              <button className={actionType === 'Withdraw' ? 'cash-actions-active' : 'cash-actions-inactive'} onClick={()=>setActionType('Withdraw')}><GiCash className='cash-action-icons'/> Withdraw</button>
              <button className={actionType === 'Transactions' ? 'cash-actions-active' : 'cash-actions-inactive'} onClick={()=>setActionType('Transactions')}><RiHistoryLine className='cash-action-icons'/> Transaction History</button>
            </div>
        </div> 
      </div>


      <div>
        {actionType === 'AddFunds' ?
        <div className="ProfileFunds">
          <h3>Add funds</h3>

          <form>
            <div class="mb-3">
              <label htmlFor="amountInput" class="form-label"><HiOutlineCurrencyRupee /> Amount</label>
              <input type="number" class="form-control" id="amountInput" placeholder='Enter amount' onChange={(e)=>setDepositAmount(e.target.value)} value={depositAmount} />
            </div>
            <div class="mb-3">
              <label htmlFor="selectInput" class="form-label"><FiCreditCard /> Payment mode</label>
              <select class="form-select" id='selectInput' aria-label="Default select example" onChange={(e)=>setDepositMode(e.target.value)} value={depositMode}>
                <option value="" selected>Choose payment mode</option>
                <option value="upi">UPI Payment</option>
                <option value="net banking">Net Banking</option>
                <option value="card">Credit/Debit Card</option>
              </select>
            </div>
            <button class="btn btn-primary" onClick={deposit}>Proceed</button>
          </form>
        </div>
        :
        ""
        }

      {actionType === 'Withdraw' ?
        <div className="ProfileFunds">
          <h3>Withdraw</h3>

          <form>
            <div class="mb-3">
              <label htmlFor="amountInput" class="form-label"><HiOutlineCurrencyRupee /> Amount</label>
              <input type="number" class="form-control" id="amountInput" placeholder='Enter amount' onChange={(e)=>setWithdrawAmount(e.target.value)} value={withdrawAmount} />
            </div>
            <div class="mb-3">
              <label htmlFor="selectInput" class="form-label"><FiCreditCard /> Withdraw mode</label>
              <select class="form-select" id='selectInput' aria-label="Default select example" onChange={(e)=>setWithdrawMode(e.target.value)} value={withdrawMode}>
                <option value="" selected>Choose withdraw mode</option>
                <option value="upi">UPI Payment</option>
                <option value="NEFT">NEFT</option>
                <option value="IMPS">IMPS</option>
              </select>
            </div>
            <button class="btn btn-primary" onClick={withdraw}>Proceed</button>
          </form>
        </div>
        :
        ""
        }


      {actionType === 'Transactions' ?
        <div className="ProfileFunds">
          <h3>Transactions</h3>

          <div className="profileTransactions">


          {transactions.filter(transaction=> transaction.user === userId).map((transaction)=>{
            return(
              <div className="profileTransaction">
                <span>
                  <h6>Amount</h6>
                  <p>$ {transaction.amount}</p>
                </span>
                <span>
                  <h6>Action</h6>
                  <p> {transaction.type} </p>
                </span>
                <span>
                  <h6>Payment mode</h6>
                  <p>{transaction.paymentMode}</p>
                </span>
                <span>
                  <h6>Time</h6>
                  <p>{transaction.time.slice(0,24)}</p>
                </span>
              </div>
            )
          })}

            

          </div>
        </div>
        :
        ""
        }


      </div>



    </div>
  )
}

export default Profile