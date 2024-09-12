import React, { useEffect, useState } from "react";
import todo from "../../assets/to do.png";
import plusmore from "../../assets/plusmore.png";
import done from "../../assets/Done.png";
import Cancelled from "../../assets/canceled.png";
import backlogimg from "../../assets/backlog.png";
import inprogressimg from "../../assets/in progress.png";
import styles from "./Status.module.css"; // Import the CSS module
import Card from "../../components/card/Card";

const Status = () => {
  const [tick, setTick] = useState([]);
  const [todonum, setTodonum] = useState([]);
  const [inProgressno, setinProgressno] = useState([]);
  const [doneno, setdoneno] = useState([]);
  const [cancelled, setcancelled] = useState([]);
  const [backlog, setbacklog] = useState([]);
  const [Order, setOrder] = useState(localStorage.getItem("order"));
  const [users, setusers] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    countTickets();
  }, [tick, Order]);

  const fetchTickets = async () => {
    try {
      const response = await fetch(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      const result = await response.json();
      setTick(result.tickets);
      setusers(result.users);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const countTickets = () => {
    const todopre = [];
    const donepre = [];
    const cancelledpre = [];
    const backlogpre = [];
    const inprogresspre = [];

    tick.forEach((ticket) => {
      if (ticket.status === "Todo") todopre.push(ticket);
      if (ticket.status === "Done") donepre.push(ticket);
      if (ticket.status === "cancelled") cancelledpre.push(ticket);
      if (ticket.status === "Backlog") backlogpre.push(ticket);
      if (ticket.status === "In progress") inprogresspre.push(ticket);
    });

    if (Order === "Title") {
      sortTicketsByTitle(
        todopre,
        inprogresspre,
        backlogpre,
        donepre,
        cancelledpre
      );
    } else {
      sortTicketsByPriority(
        todopre,
        inprogresspre,
        backlogpre,
        donepre,
        cancelledpre
      );
    }

    setTodonum(todopre);
    setbacklog(backlogpre);
    setcancelled(cancelledpre);
    setdoneno(donepre);
    setinProgressno(inprogresspre);
  };

  const sortTicketsByTitle = (todo, inprogress, backlog, done, cancelled) => {
    [todo, inprogress, backlog, done, cancelled].forEach((list) =>
      list.sort((a, b) => a.title.localeCompare(b.title))
    );
  };

  const sortTicketsByPriority = (
    todo,
    inprogress,
    backlog,
    done,
    cancelled
  ) => {
    [todo, inprogress, backlog, done, cancelled].forEach((list) =>
      list.sort((a, b) => parseInt(b.priority) - parseInt(a.priority))
    );
  };

  const getUserAvailability = (userId) => {
    const user = users.find((item) => item.id === userId);
    return user ? user.available : true;
  };

  return (
    <div className={styles.Boards}>
      <Board
        imgSrc={backlogimg}
        title="Backlog"
        count={backlog.length}
        tickets={backlog}
        users={users}
      />
      <Board
        imgSrc={todo}
        title="Todo"
        count={todonum.length}
        tickets={todonum}
        users={users}
      />
      <Board
        imgSrc={inprogressimg}
        title="In-Progress"
        count={inProgressno.length}
        tickets={inProgressno}
        users={users}
      />
      <Board
        imgSrc={done}
        title="Done"
        count={doneno.length}
        tickets={doneno}
        users={users}
      />
      <Board
        imgSrc={Cancelled}
        title="Canceled"
        count={cancelled.length}
        tickets={cancelled}
        users={users}
      />
    </div>
  );
};

const Board = ({ imgSrc, title, count, tickets, users }) => {
  return (
    <div className={styles.Board}>
      <div className={styles.boardHeading}>
        <img src={imgSrc} className={styles.headingImg} alt="" />
        <p className={styles.cText}>{title}</p>
        <p className={styles.cText}>{count}</p>
        <div className={styles.plusIcon}>
          <img src={plusmore} className={styles.headingImg} alt="" />
        </div>
      </div>
      <div className={styles.Cards}>
        {tickets.map((ticket) => (
          <Card
            key={ticket.id}
            ticket={ticket}
            available={
              users.find((item) => item.id === ticket.userId)?.available
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Status;
