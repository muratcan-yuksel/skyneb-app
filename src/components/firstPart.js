import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import "../style/app.css";
//to grab the values of our states, we need to use useSelector
import { useSelector, useDispatch } from "react-redux";
//useDispatch hook is used to MODIFY values over states
//while useSelector hook is used to ACCESS values over states
//import login action from user so that I can use this in dispatch
import { getOrderBookData } from "../features/orderBookComp1";

function FirstPart() {
  //give an initial state so that the data won't be undefined at start
  //   const [asks, setAsks] = useState([0]);
  //   const [bids, setBids] = useState([0]);
  //   // //define the number of items
  //   // const n = 15;

  const dispatch = useDispatch();
  // const [state, setState] = useState([0]);
  // console.log(initialStateValue);
  const orders = useSelector((state) => state.orderBook.value);
  //   console.log(orders);
  //   console.log(orders.asks);
  let asks = orders.asks;
  //   console.log(asks);
  //   for (let props in asks) {
  //     console.log(`${props}: ${asks[props][0]}`);
  //   }
  //   if (asks != null || asks != undefined) {
  //     const try12 = Object.entries(asks)
  //       .slice(0, 2)
  //       .map((entry) => entry[1]);
  //     console.log(try12);
  //   }

  if (asks != null || asks != undefined) {
    const someValue = Object.values(asks);

    console.log(someValue);
  }

  const ws = new WebSocket("wss://ws.bitstamp.net");

  const apiCall = {
    event: "bts:subscribe",
    data: { channel: "order_book_btcusd" },
  };

  ws.onopen = (event) => {
    ws.send(JSON.stringify(apiCall));
  };
  //clean up lest memory leaks
  useEffect(() => {
    ws.onmessage = function (event) {
      const json = JSON.parse(event.data);
      // console.log(`[message] Data received from server: ${json}`);
      try {
        if ((json.event = "data")) {
          //   //önce sıralayalım
          //   //büyükten küçüğe
          //   //(bids is arranged by itself)
          //   setBids(json.data.bids.slice(0, 15));
          //   //küçükten büyüğe
          //   //(asks too is arranged by itself)
          //   setAsks(json.data.asks.slice(0, 15));

          dispatch(getOrderBookData(json.data));
          //   console.log(json.data);
        }
      } catch (err) {
        // console.log(err);
      }
      // console.log(bids);
    };
    //clean up function
    return () => ws.close();
  }, []);

  //   //map the first 15 bids
  //   const firstBids = orders.bids.map((item) => {
  //     return (
  //       <div className="flexing" key={uniqid()}>
  //         <p style={{ color: "green" }}> {item[0]}</p>
  //         <p style={{ color: "white" }}> {item[1]}</p>
  //         <p style={{ color: "white" }}> {(item[0] * item[1]).toFixed(4)}</p>
  //       </div>
  //     );
  //   });
  //   //map the first 15 asks
  //   const firstAsks = orders.asks.map((item) => {
  //     return (
  //       <div className="flexing" key={uniqid()}>
  //         <p style={{ color: "red" }}> {item[0]}</p>
  //         <p style={{ color: "white" }}> {item[1]}</p>
  //         <p style={{ color: "white" }}> {(item[0] * item[1]).toFixed(4)}</p>
  //       </div>
  //     );
  //   });

  // console.log(bids);
  // console.log(asks);
  return (
    <div>
      <div>
        <h1 style={{ color: "white" }}>Asks</h1>
        <div className="flexing">
          <h4 style={{ color: "grey" }}>Fiyat(USDT)</h4>
          <h4 style={{ color: "grey" }}>Miktar(BTC)</h4>
          <h4 style={{ color: "grey" }}>Toplam</h4>
        </div>
        {/* {firstAsks} */}
      </div>
      <div>
        <h1 style={{ color: "white" }}>Bids</h1>
        {/* {firstBids} */}
      </div>
    </div>
  );
}

export default FirstPart;
