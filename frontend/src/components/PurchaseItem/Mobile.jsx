import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import ActionButton from "../ActionButton/ActionButton";

import styles from "./Mobile.module.css";

function PurchaseItem() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <p>Supermercado Central</p>
        <p>R$ 127,50</p>
      </header>

      <div className={styles.info}>
        <time dateTime="">15 Jan 2025 • 14:30</time>
        <span>Alimentação • 12 itens</span>
      </div>

      <footer className={styles.footer}>
        <button className={styles.btnDetails}>
          <MoreHorizIcon sx={{ fontSize: 14 }} />
          <span>Ver detalhes</span>
        </button>

        <div className={styles.actions}>
          <ActionButton Icon={EditIcon} iconColor="#fff" bgColor="#fda212" />
          <ActionButton Icon={DeleteIcon} iconColor="#fff" bgColor="#DD2E48" />
        </div>
      </footer>
    </div>
  );
}

export default PurchaseItem;
