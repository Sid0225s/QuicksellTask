import React, { useEffect, useState } from "react";
import styles from "./User.module.css";
import plusmore from "../../assets/plusmore.png";
import availableimg from "../../assets/availableimg.png";
import notavailableimg from "../../assets/notavailableimg.png";

import usr1 from "../../assets/usr1.png";
import usr2 from "../../assets/usr-2.png";
import usr3 from "../../assets/usr-3.png";
import usr4 from "../../assets/usr-4.png";
import usr5 from "../../assets/usr-5.png";
import usr6 from "../../assets/usr-6.png";
import usr7 from "../../assets/usr-7.png";
import CardUser from "../../components/card/CardUser";

const User = (props) => {
  let available = true;
  const [tick, setTick] = useState([{ id: "CAM" }]);
  const [users, setusers] = useState([{ id: "CAM" }]);
  const [usermass, setusermass] = useState([]);

  useEffect(() => {
    hello();
  }, []);

  useEffect(() => {
    count();
  }, [tick, users, props.order]);

  async function hello() {
    try {
      const response = await fetch(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );

      const result = await response.json();

      setTick(result.tickets);
      setusers(result.users);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function count() {
    let masspre = [];
    users.forEach((user) => {
      let temp = [];
      tick.forEach((ticket) => {
        if (ticket.userId === user.id) {
          temp.push(ticket);
        }
      });
      if (props.order === "Title") {
        temp.sort((a, b) => a.title.localeCompare(b.title));
      } else {
        temp.sort((b, a) => parseInt(a.priority) - parseInt(b.priority));
      }

      masspre.push(temp);
    });

    setusermass(masspre);
  }

  const usrImageMap = {
    "usr-1": usr1,
    "usr-2": usr2,
    "usr-3": usr3,
    "usr-4": usr4,
    "usr-5": usr5,
    "usr-6": usr6,
    "usr-7": usr7,
  };

  return (
    <div className={styles.Boards}>
      {usermass.map((user) => (
        <div className={styles.Board} key={user[0]?.userId}>
          <div className={styles.boardHeading}>
            <img
              src={(user[0] && usrImageMap[user[0].userId]) || usr1}
              className={styles.headingImg2}
              alt=""
            />

            {users.map((item) => {
              if (user[0] && item.id === user[0].userId) {
                available = item.available;
                return (
                  <p className={styles.cText} key={item.id}>
                    {item.name}
                  </p>
                );
              }
              return null;
            })}

            <p className={styles.cText}>{user.length}</p>
            {available && (
              <img src={availableimg} alt="Available" className={styles.dot} />
            )}
            {!available && (
              <img
                src={notavailableimg}
                alt="Not Available"
                className={styles.dot}
              />
            )}
            <div className={styles.boardHeading} id="pluske">
              <img
                src={plusmore}
                className={styles.headingImg}
                alt="Plus More"
              />
            </div>
          </div>

          <div className={styles.Cards}>
            {user.length > 0 &&
              user.map((ticket) => (
                <CardUser
                  ticket={ticket}
                  available={available}
                  key={ticket.id}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default User;
