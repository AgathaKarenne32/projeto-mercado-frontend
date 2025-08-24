import { usePurchase } from "../../contexts/Purchase/PurchaseContext";

import PurchaseItem from "../PurchaseItem/Mobile";

import styles from "./Mobile.module.css";

function PurchaseList() {
  const { state } = usePurchase();

  return (
    <div className={styles.container}>
      {state.map((purchase) => (
        <PurchaseItem
          key={purchase.id}
          id={purchase.id}
          date={purchase.date}
          market={purchase.market}
          items={purchase.items}
          total={purchase.total}
        />
      ))}
    </div>
  );
}

export default PurchaseList;
