import "./App.css";
import { useState } from "react";
import Status from "./Sections/Status/Status";
import Priority from "./Sections/Priority/Priority";
import User from "./Sections/User/User";
import Navbar from "./Sections/Navbar/Navbar";

function App() {
  const [Grouping, setGrouping] = useState(localStorage.getItem("grouping"));
  const [Order, setOrder] = useState(localStorage.getItem("order"));
  const setGroupingValue = (newValue) => {
    if (
      newValue === "status" ||
      newValue === "priority" ||
      newValue === "user"
    ) {
      setGrouping(newValue);
    } else {
      console.error("Invalid grouping value provided:", newValue);
    }
  };

  const setOrderingValue = (newValue) => {
    if (newValue === "Priority" || newValue === "Title") {
      setOrder(newValue);
    } else {
      console.error("Invalid ordering value provided:", newValue);
    }
  };
  let content;

  if (Grouping === "status") {
    content = <Status order={Order} />;
  } else if (Grouping === "priority") {
    content = <Priority order={Order} />;
  } else {
    content = <User order={Order} />;
  }
  return (
    <div className="fullBody">
      <Navbar
        order={Order}
        grouping={Grouping}
        setGroupingValue={setGroupingValue}
        setOrderingValue={setOrderingValue}
      ></Navbar>
      {content}
    </div>
  );
}

export default App;
