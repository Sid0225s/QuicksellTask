import React, { useEffect, useState } from "react";
import styles from "./Card.module.css";
import tag from "../../assets/tag.png";
import img0 from "../../assets/nopriority.png";
import img4 from "../../assets/urgent.png";
import img3 from "../../assets/high.png";
import img2 from "../../assets/medium.png";
import img1 from "../../assets/low.png";
import done from "../../assets/Done.png";
import Cancelled from "../../assets/canceled.png";
import backlogimg from "../../assets/backlog.png";
import inprogressimg from "../../assets/in progress.png";
import todo from "../../assets/to do.png";
import usr1 from "../../assets/usr-1.png";
import usr2 from "../../assets/usr-2.png";
import usr3 from "../../assets/usr-3.png";
import usr4 from "../../assets/usr-4.png";
import usr5 from "../../assets/usr-5.png";
import usr6 from "../../assets/usr-6.png";
import usr7 from "../../assets/usr-7.png";

const CardPriority = (props) => {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      const result = await response.json();
      setAvailable(
        result.users.find((user) => user.id === props.ticket.userId)
          ?.available || false
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const priorityImageMap = {
    0: img0,
    1: img1,
    2: img2,
    3: img3,
    4: img4,
  };

  const statusImageMap = {
    Todo: todo,
    "In progress": inprogressimg,
    Backlog: backlogimg,
    Done: done,
    Cancelled: Cancelled,
  };

  const usrImageMap = {
    "usr-1": usr1,
    "usr-2": usr2,
    "usr-3": usr3,
    "usr-4": usr4,
    "usr-5": usr5,
    "usr-6": usr6,
    "usr-7": usr7,
  };

  const usrImage = usrImageMap[props.ticket.userId] || usr1;
  const imgSrc = priorityImageMap[props.ticket.priority] || img0;
  const statusImgSrc = statusImageMap[props.ticket.status] || todo;

  return (
    <div className={styles.cardBox}>
      <div className={styles.cardBoxrow}>
        <div className={styles.cardBoxin}>
          <span className={styles.cardId}>{props.ticket.id}</span>
          <span className={styles.cardTitle}>
            <img src={statusImgSrc} alt="status" />
            {props.ticket.title}
          </span>
        </div>
        <div className={styles.userContainer}>
          <img className={styles.userImg} src={usrImage} alt="user" />
          <div
            className={
              available ? styles.availableUser : styles.notAvailableUser
            }
          />
        </div>
      </div>
      <div className={styles.lowerBox}>
        <div className={styles.priorityBox}>
          <img className={styles.priorityImg} src={imgSrc} alt="priority" />
        </div>
        <div className={styles.tagBox}>
          <img className={styles.tagImg} src={tag} alt="tag" />
          <span className={styles.tagText}>{props.ticket.tag}</span>
        </div>
      </div>
    </div>
  );
};

export default CardPriority;
