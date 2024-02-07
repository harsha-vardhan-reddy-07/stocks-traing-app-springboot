import React, { useEffect, useState } from 'react'
import '../styles/Users.css'
import axios from 'axios'

const Users = () => {

  const [users, setUsers] = useState([]);


  useEffect(()=>{
    fetchUsers();
  },[])

  const fetchUsers = async () =>{
    await axios.get("http://localhost:6001/fetch-users").then(
      (response)=>{
          setUsers(response.data);
      }
    )
  }

  return (
    <div class="all-users-page">
        <h2>All users</h2>
        <div class="all-users">

          {users.filter(user=> user.usertype !== 'admin').map((user)=>{
            return(
              <div class="user" >
              <p><b>User id </b>{user._id}</p>
              <p><b>Username </b>{user.username}</p>
              <p><b>Email </b>{user.email}</p>
              <p><b>Balance </b>{user.balance}</p>
          </div>
            )
          })}

              

            
        </div>
    </div>
  )
}

export default Users