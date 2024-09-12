import React, { useState } from "react";
import styles from "./Dropdown.module.css";

function Dropdown(props) {
  const [selectedValue, setSelectedValue] = useState(
    localStorage.getItem("grouping") || "status"
  );
  const [selectedValueorder, setSelectedValueorder] = useState(
    localStorage.getItem("order") || "Priority"
  );

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    props.setGroupingValue(event.target.value);
    localStorage.setItem("grouping", event.target.value);
  };

  const handleSelectChangeorder = (event) => {
    setSelectedValueorder(event.target.value);
    props.setOrderingValue(event.target.value);
    localStorage.setItem("order", event.target.value);
  };

  return (
    <div className={styles.dropdown}>
      <ul>
        Grouping
        <div>
          <select
            name="grouping"
            value={selectedValue}
            onChange={handleSelectChange}
          >
            <option value="status">Status</option>
            <option value="priority">Priority</option>
            <option value="user">User</option>
          </select>
        </div>
      </ul>
      <ul>
        Ordering
        <div>
          <select
            name="ordering"
            value={selectedValueorder}
            onChange={handleSelectChangeorder}
          >
            <option value="Priority">Priority</option>
            <option value="Title">Title</option>
          </select>
        </div>
      </ul>
    </div>
  );
}

export default Dropdown;
