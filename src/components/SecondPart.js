import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import "../style/app.css";
//to grab the values of our states, we need to use useSelector
import { useSelector, useDispatch } from "react-redux";
//useDispatch hook is used to MODIFY values over states
//while useSelector hook is used to ACCESS values over states
//import login action from user so that I can use this in dispatch
import { getData, initialStateValue } from "../features/liveOrdersComp2";

const SecondPart = () => {
  const dispatch = useDispatch();
  // const [state, setState] = useState([0]);
  // console.log(initialStateValue);
  const orders = useSelector((state) => state.liveOrders.value);
  console.log(orders);

  const ws = new WebSocket("wss://ws.bitstamp.net");

  const apiCall = {
    event: "bts:subscribe",
    data: { channel: "live_orders_btcusd" },
  };

  ws.onopen = (event) => {
    ws.send(JSON.stringify(apiCall));
  };

  //clean up lest memory leaks
  useEffect(() => {
    ws.onmessage = function (event) {
      const json = JSON.parse(event.data);
      try {
        if ((json.event = "data")) {
          dispatch(getData(json.data));
        }
      } catch (err) {
        // console.log(err);
      }
    };
    //clean up function
    return () => ws.close();
  }, []);

  // console.log(state);
  //map prices with dynamic colors
  const mapPrices = orders.map((item) => {
    if (item.order_type === 0) {
      return (
        <p key={uniqid()} style={{ color: "green" }}>
          {item.price}
        </p>
      );
    } else if (item.order_type === 1) {
      return (
        <p key={uniqid()} style={{ color: "red" }}>
          {item.price}
        </p>
      );
    }
  });

  const mapAmount = orders.map((item) => {
    return (
      <p key={uniqid()} style={{ color: "white" }}>
        {item.amount}
      </p>
    );
  });

  const mapDate = orders.map((item) => {
    let date = item.datetime;
    let dateArr = Array.from(String(date), Number);
    dateArr.splice(2, 0, ":");
    dateArr.splice(5, 0, ":");
    dateArr.splice(-4);
    let lastArr = dateArr.join("");
    return (
      <p key={uniqid()} style={{ color: "white" }}>
        {lastArr}{" "}
      </p>
    );
  });

  return (
    <div>
      <h3>Piyasa Alım Satımları</h3>
      <div className="flexing">
        <h4 style={{ color: "grey" }}>Fiyat(USDT)</h4>
        <h4 style={{ color: "grey" }}>Miktar(BTC)</h4>
        <h4 style={{ color: "grey" }}>Saat</h4>
      </div>
      <div className="flexing">
        <div>{mapPrices}</div>
        <div>{mapAmount}</div>
        <div>{mapDate}</div>
      </div>
    </div>
  );
};

export default SecondPart;
