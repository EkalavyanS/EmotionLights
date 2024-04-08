import { Link, useNavigate } from "react-router-dom";
import styles from "./FrameComponent.module.css";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";

const FrameComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const signUser = () => {
    signInWithEmailAndPassword(auth, email, password).then((data) => {
      console.log(data.user.uid)
      navigate("/", { state: { uid: data.user.uid } });
    });
  };
  return (
    <div className={styles.frameParent}>
      <div className={styles.frameGroup}>
        <div className={styles.welcomeBackParent}>
          <h1 className={styles.welcomeBack}>Welcome back</h1>
          <div className={styles.welcomeBackPlease}>
            Welcome back! Please enter your details.
          </div>
        </div>
        <div className={styles.emailParent}>
          <div className={styles.email}>Email</div>
          <div className={styles.frameWrapper}>
            <input
              className={styles.rectangleParent}
              placeholder="Enter you email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        </div>
        <div className={styles.passwordParent}>
          <div className={styles.password}>Password</div>
          <input
            className={styles.rectangleGroup}
            placeholder="******"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
      </div>
      <div className={styles.signInButtonWrapper}>
        <button className={styles.signInButton} onClick={signUser}>
          <div className={styles.signInButtonChild} />
          <div className={styles.signIn}>Sign in</div>
        </button>
      </div>
      <div className={styles.dontHaveAnAccountSignUpWrapper}>
        <div className={styles.dontHaveAnContainer}>
          <span>Don’t have an account?</span>
          <span className={styles.span}>{` `}</span>
          <Link>
            <span className={styles.signUpFo}>Sign up </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent;
