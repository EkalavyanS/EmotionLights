import FrameComponent from "./FrameComponent";
import styles from "./AppleWatchLandingPage.module.css";
import Image from "../assets/right-side@2x.png";

const AppleWatchLandingPage = () => {
  return (
    <div className={styles.appleWatchLandingPage}>
      <div className={styles.appleWatchLandingPageInner}>
        <FrameComponent />
      </div>
      <img className={styles.rightSideIcon} loading="lazy" alt="" src={Image} />
    </div>
  );
};

export default AppleWatchLandingPage;
