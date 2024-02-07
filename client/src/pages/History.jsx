import React, { useEffect, useState } from "react";
import "../styles/History.css";
import axios from "axios";

const History = () => {
  const [orders, setOrders] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    await axios
      .get("http://localhost:6001/fetch-orders")
      .then((response) => {
        setOrders(response.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="historyPage">
      <div className="user-history-container">
        <div className="user-history-container-head">
          <h2>My Orders</h2>
        </div>

        <div className="user-history">
          {orders
            .filter((order) => order.user === userId)
            .map((order) => {
              return (
                <div className="user-history-stock" key={order._id}>
                  <h6>{order.stockType}</h6>
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

export default History;
