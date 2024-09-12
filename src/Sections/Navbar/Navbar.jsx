import React, { useEffect, useRef, useState } from "react";
import optionsimg from "../../assets/options.png";
import Dropdown from "../../components/Dropdown/Dropdown";
import styles from "./Navbar.module.css";
import dropdownimg from "../../assets/dropdown.png";

function Navbar(props) {
  const [Opendrop, setOpendrop] = useState(false);
  const dropdownButtonRef = useRef(null);

  function onClickHandler() {
    console.log("hello");
    setOpendrop(!Opendrop);
  }

  const closeDropdown = (event) => {
    if (Opendrop && !dropdownButtonRef.current.contains(event.target)) {
      setOpendrop(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, [Opendrop]);
  return (
    <div className={styles.randombar}>
      <div className={styles.topBar} onClick={onClickHandler}>
        <img src={optionsimg} className={styles.optionsImg} alt=""></img>

        <button className={styles.button}>Display</button>

        <img src={dropdownimg} className={styles.optionsImg2} alt=""></img>
      </div>
      {Opendrop && (
        <div ref={dropdownButtonRef}>
          <Dropdown
            order={props.order}
            grouping={props.grouping}
            setGroupingValue={props.setGroupingValue}
            setOrderingValue={props.setOrderingValue}
          />
        </div>
      )}
    </div>
  );
}

export default Navbar;
