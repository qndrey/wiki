import React from "react";

import styles from "./loading.module.css";

function Loading() {
  return (
    <div className={styles["loading-box"]}>
      <div className={styles.loading}>Loading...</div>
    </div>
  );
}

export default Loading;
