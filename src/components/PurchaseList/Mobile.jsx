import { usePurchase } from "../../context/PurchaseContext/PurchaseContext";

import PurchaseItem from "../PurchaseItem/Mobile";

import styles from "./Mobile.module.css";

function PurchaseList() {
  const { state } = usePurchase();

  return (
    <section className={styles.container}>
      {console.log(state)}
      {state.map((purchase) => (
        <PurchaseItem
          key={purchase.accessKey}
          id={purchase.accessKey}
          date={purchase.date}
          market={purchase.store}
          items={purchase.products}
          total={purchase.totalPrice}
        />
      ))}
    </section>
  );
}

export default PurchaseList;
