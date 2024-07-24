import axios from "axios";
import React, { useEffect } from "react";
import { Web3, HttpProvider } from "web3";
function App() {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // fetch("http://localhost:5000/todos")
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err))
    //   .finally(() => console.log("well done"));
    try {
      axios.get("http://localhost:5000/todos").then((res)=> console.log(res.data));
      ;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="todos-wrapper">
      <h1>todos</h1>
    </div>
  );
}

export default App;
