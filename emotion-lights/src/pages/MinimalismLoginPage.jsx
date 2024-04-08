import FrameComponent1 from "./FrameComponent1";
import styles from "./MinimalismLoginPage.module.css";

const MinimalismLoginPage = () => {
  return (
    <div className={styles.minimalismLoginPage}>
      <div className={styles.vectorParent}>
        <img className={styles.vectorIcon} alt="" src="/vector.svg" />
        <FrameComponent1 />
        <div className={styles.vectorGroup}>
          <img
            className={styles.vectorIcon1}
            loading="lazy"
            alt=""
            src="/vector.svg"
          />
          <div className={styles.vectorWrapper}>
            <img
              className={styles.vectorIcon2}
              loading="lazy"
              alt=""
              src="/vector.svg"
            />
          </div>
        </div>
      </div>
      <div className={styles.minimalismLoginPageInner}>
        <img
          className={styles.frameChild}
          loading="lazy"
          alt=""
          src="/rectangle-4@2x.png"
        />
      </div>
    </div>
  );
};

export default MinimalismLoginPage;
