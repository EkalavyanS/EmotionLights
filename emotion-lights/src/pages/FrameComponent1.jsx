import { useState } from "react";
import styles from "./FrameComponent1.module.css";
import { useNavigate } from "react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase-config";
import { collection, addDoc } from "@firebase/firestore";

const FrameComponent1 = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const RegisterClick = async () => {
    console.log("register start")
    await createUserWithEmailAndPassword(auth, email, pass).then((data) => {
      console.log(data.user.uid);
      const userRef = collection(db, "Users");
      addDoc(userRef, {
        email: email,
        uid: data.user.uid,
      });
    });
    navigate("/home");
  };
  return (
    <div className={styles.greatToSeeYouParent}>
      <h1 style={{ fontSize: 40 }}>Great to see you</h1>
      <div className={styles.frameWrapper}>
        <div className={styles.rectangleParent}>
          <div className={styles.rectangleGroup}>
            <div className={styles.frameItem} />
            <img className={styles.frameIcon1} alt="" src="/frame.svg" />
            <input
              className={{
                width: "80%",
                height: "100%",
                margin: "0px",
                border: "0px",
                backgroundColor: "transparent",
              }}
              placeholder="Email"
              type="text"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className={styles.frameContainer}>
        <div className={styles.rectangleGroup}>
          <div className={styles.frameItem} />
          <img className={styles.frameIcon1} alt="" src="/frame-1.svg" />
          <input
            className={{
              width: "80%",
              height: "100%",
              margin: "0px",
              border: "0px",
              backgroundColor: "transparent",
            }}
            placeholder="Password"
            type="text"
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
        </div>
      </div>
      <div className={styles.frameDiv}>
        <button className={styles.rectangleContainer} onClick={RegisterClick}>
          <div className={styles.rectangleDiv} />
          <b className={styles.signup}>SignUp</b>
        </button>
      </div>
    </div>
  );
};

export default FrameComponent1;
