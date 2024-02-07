import React, { useEffect, useState } from "react";
import "../styles/AllOrders.css";
import axios from "axios";

const AllOrders = () => {

  
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    await axios.get("http://localhost:6001/fetch-orders")
      .then((response) => {
        setOrders(response.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
   <div className="orderPage">
      <div className="all-orders-container">
        <div className="all-orders-container-head">
          <h2>My Orders</h2>
        </div>

        <div className="all-orders">
          {orders
            .map((order) => {
              return (
                <div className="all-orders-stock" key={order._id}>
                  <span>
                    <h5>UserId</h5>
                    <p>{order.user}</p>
                  </span>
                  <span>
                    <h5>Order Type</h5>
                    <p>{order.stockType}</p>
                  </span>
                  <span>
                    <h5>Stock name</h5>
                    <p>{order.name}</p>
                  </span>
                  <span>
                    <h5>Symbol</h5>
                    <p>{order.symbol}</p>
                  </span>
                  <span>
                    <h5>Order type</h5>
                    <p>{order.orderType}</p>
                  </span>
                  <span>
                    <h5>Stocks</h5>
                    <p>{order.count}</p>
                  </span>
                  <span>
                    <h5>order price</h5>
                    <p>$ {order.price}</p>
                  </span>
                  <span>
                    <h5>order total value</h5>
                    <p>$ {order.totalPrice}</p>
                  </span>
                  <span>
                    <h5>order status</h5>
                    <p style={{ color: "green" }}>{order.orderStatus}</p>
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
