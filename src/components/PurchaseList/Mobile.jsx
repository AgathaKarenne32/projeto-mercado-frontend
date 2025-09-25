import { usePurchase } from "../../context/PurchaseContext/PurchaseContext";

import PurchaseItem from "../PurchaseItem/Mobile";

import styles from "./Mobile.module.css";

function PurchaseList() {
  const { state } = usePurchase();

  return (
    <section className={styles.container}>
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
    </section>
  );
}

export default PurchaseList;
