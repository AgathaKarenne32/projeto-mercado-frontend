
import styles from "./Purchase.module.css";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import { usePurchase } from "../../context/PurchaseContext/PurchaseContext";
import StatCard from "../../components/StatCard";

import {useState, useEffect} from "react";

const PurchaseCards= () => {
  const { totalItems, valorTotal, ticketMedio } = usePurchase();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 769);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <section className={styles.cards}>
        <div className={styles.statCardWrapper} style={{ backgroundColor: "#6B7280" }}>
          <StatCard label="Total de Compras" value={totalItems} className={styles.statCard} />

            {!isMobile && <ShoppingCartOutlinedIcon className={styles.statCardIcon} />}
        </div>
        <div className={styles.statCardWrapper} style={{ backgroundColor: "#A239FE" }}>
          <StatCard label="Valor Total" value={valorTotal} className={styles.statCard} />

            {!isMobile && <PaymentsOutlinedIcon className={styles.statCardIcon} />}
        </div>
        <div className={styles.statCardWrapper} style={{ backgroundColor: "#2196F3" }}>
          <StatCard label="Ticket Médio" value={ticketMedio} className={styles.statCard} />

            {!isMobile && <LocalActivityOutlinedIcon className={styles.statCardIcon} />}
        </div>
      </section>
    </>
  );
};

export default PurchaseCards;