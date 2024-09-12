import React, { useEffect, useState } from "react";
import styles from "./Priority.module.css";
import plusmore from "../../assets/plusmore.png";
import nopriorityimg from "../../assets/nopriority.png";
import urgentimg from "../../assets/urgent.png";
import highimg from "../../assets/high.png";
import mediumimg from "../../assets/medium.png";
import lowimg from "../../assets/low.png";
import CardPriority from "../../components/card/CardPriority";

const Priority = (props) => {
  const [tick, setTick] = useState([{ id: "CAM" }]);
  const [nopriority, setnopriority] = useState([]);
  const [lowpriority, setlowpriority] = useState([]);
  const [hightpriority, sethightpriority] = useState([]);
  const [mediumpriority, setmediumpriority] = useState([]);
  const [urgent, seturgent] = useState([]);

  useEffect(() => {
    hello();
  }, []);

  useEffect(() => {
    count();
  }, [tick]);

  async function hello() {
    try {
      const response = await fetch(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );

      const result = await response.json();

      setTick(result.tickets);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function count() {
    let noprioritypre = [];
    let lowprioritypre = [];
    let mediumprioritypre = [];
    let hightprioritypre = [];
    let urgetnpre = [];

    tick.map((ticket) => {
      if (ticket.priority === 0) noprioritypre.push(ticket);
      if (ticket.priority === 1) lowprioritypre.push(ticket);
      if (ticket.priority === 2) mediumprioritypre.push(ticket);
      if (ticket.priority === 3) hightprioritypre.push(ticket);
      if (ticket.priority === 4) urgetnpre.push(ticket);
    });

    noprioritypre.sort((a, b) => a.title.localeCompare(b.title));
    lowprioritypre.sort((a, b) => a.title.localeCompare(b.title));
    mediumprioritypre.sort((a, b) => a.title.localeCompare(b.title));
    hightprioritypre.sort((a, b) => a.title.localeCompare(b.title));
    urgetnpre.sort((a, b) => a.title.localeCompare(b.title));

    setnopriority(noprioritypre);
    setlowpriority(lowprioritypre);
    setmediumpriority(mediumprioritypre);
    sethightpriority(hightprioritypre);
    seturgent(urgetnpre);
  }

  return (
    <div className={styles.Boards}>
      <div className={styles.Board}>
        <div className={styles.boardHeading}>
          <img src={nopriorityimg} className={styles.headingImg} alt="" />
          <p className={styles.cText} style={{ width: "190px" }}>
            No-Priority
          </p>
          <p className={styles.cText}>{nopriority.length}</p>
          <div className={styles.plusIcon}>
            <img src={plusmore} className={styles.headingImg} alt="" />
          </div>
        </div>

        <div className={styles.Cards}>
          {nopriority.length > 0 &&
            nopriority.map(
              (ticket) =>
                ticket.priority === 0 && <CardPriority ticket={ticket} />
            )}
        </div>
      </div>
      <div className={styles.Board}>
        <div className={styles.boardHeading}>
          <img src={urgentimg} className={styles.headingImg} alt="" />
          <p className={styles.cText}>Urgent</p>
          <p className={styles.cText}>{urgent.length}</p>
          <div className={styles.plusIcon}>
            <img src={plusmore} className={styles.headingImg} alt="" />
          </div>
        </div>

        <div className={styles.Cards}>
          {urgent.length > 0 &&
            urgent.map(
              (ticket) =>
                ticket.priority === 4 && <CardPriority ticket={ticket} />
            )}
        </div>
      </div>
      <div className={styles.Board}>
        <div className={styles.boardHeading}>
          <img src={highimg} className={styles.headingImg} alt="" />
          <p className={styles.cText}>High</p>
          <p className={styles.cText}>{hightpriority.length}</p>
          <div className={styles.plusIcon}>
            <img src={plusmore} className={styles.headingImg} alt="" />
          </div>
        </div>

        <div className={styles.Cards}>
          {hightpriority.length > 0 &&
            hightpriority.map(
              (ticket) =>
                ticket.priority === 3 && <CardPriority ticket={ticket} />
            )}
        </div>
      </div>
      <div className={styles.Board}>
        <div className={styles.boardHeading}>
          <img src={mediumimg} className={styles.headingImg} alt="" />
          <p className={styles.cText}>Medium</p>
          <p className={styles.cText}>{mediumpriority.length}</p>
          <div className={styles.plusIcon}>
            <img src={plusmore} className={styles.headingImg} alt="" />
          </div>
        </div>

        <div className={styles.Cards}>
          {mediumpriority.length > 0 &&
            mediumpriority.map(
              (ticket) =>
                ticket.priority === 2 && <CardPriority ticket={ticket} />
            )}
        </div>
      </div>
      <div className={styles.Board}>
        <div className={styles.boardHeading}>
          <img src={lowimg} className={styles.headingImg} alt="" />
          <p className={styles.cText}>Low</p>
          <p className={styles.cText}>{lowpriority.length}</p>
          <div className={styles.plusIcon}>
            <img src={plusmore} className={styles.headingImg} alt="" />
          </div>
        </div>

        <div className={styles.Cards}>
          {lowpriority.length > 0 &&
            lowpriority.map(
              (ticket) =>
                ticket.priority === 1 && <CardPriority ticket={ticket} />
            )}
        </div>
      </div>
    </div>
  );
};

export default Priority;
