import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import ItemTags from "../ItemTags/ItemTags";

import "./PurchaseItem.css";

function PurchaseItem({ date, market, items, totalPrice }) {
  return (
    <tr className="purchase-item">
      <td className="purchase-item-date">
        <div className="purchase-item-cell-content">
          <CalendarTodayIcon sx={{ fontSize: 12 }} />
          <p>{date}</p>
        </div>
      </td>

      <td className="purchase-item-market">
        <div className="purchase-item-cell-content">
          <AddCircleIcon sx={{ fontSize: 16 }} />
          <p>{market}</p>
        </div>
      </td>

      <td>
        <ItemTags items={items} />
      </td>

      <td className="purchase-item-price">R$ {totalPrice.toFixed(2)}</td>

      <td>
        <div className="purchase-item-actions">
          <button className="purchase-item-btn purchase-item-btn-view">
            <VisibilityIcon sx={{ fontSize: 16, color: "#fff" }} />
          </button>

          <button className="purchase-item-btn purchase-item-btn-edit">
            <EditIcon sx={{ fontSize: 16, color: "#fff" }} />
          </button>

          <button className="purchase-item-btn purchase-item-btn-delete">
            <DeleteIcon sx={{ fontSize: 16, color: "#fff" }} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default PurchaseItem;
