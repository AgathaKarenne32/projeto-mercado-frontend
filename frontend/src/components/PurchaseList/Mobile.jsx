import PurchaseItem from "../PurchaseItem/Mobile";

import styles from "./Mobile.module.css";

function PurchaseList() {
  return (
    <div className={styles.container}>
      <PurchaseItem />
      <PurchaseItem />
      <PurchaseItem />
    </div>
  );
}

export default PurchaseList;
