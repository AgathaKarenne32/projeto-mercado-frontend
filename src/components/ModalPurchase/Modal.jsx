import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { usePurchase } from "../../context/PurchaseContext/PurchaseContext";

import { getAllCatalogByMarketId, getAllMarkets, registerManualPurchase } from "../../services/nfceService";
import { SelectItem } from "../modal/ModalSelectItem/SelectItem";
import { toast } from "react-toastify";

import "./Modal.css";
import { SelectMarket } from "../modal/ModalSelectMarket/SelectMarket";

const Modal = ({ toggleModal }) => {
  const { dispatch } = usePurchase();

  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];

  const [date, setDate] = useState(localDate);
  const [items, setItems] = useState([{ name: "", quantity: 1, price: "", total: "" }]);
  const [market, setMarket] = useState("");
  const [purchaseTotal, setCompraTotal] = useState(0);
  const [isSendingRequest, setIsSendingRequest] = useState(false);

  const addItem = () => {
    setItems([...items, { name: "", quantity: 1, price: "", total: "" }]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    calculaValorTotal(newItems);
  };

  const verificaValor = (index, event) => {
    let name, value, code , unit= null;
    if (event.type != null && event.type == "item-name") {
      if (event.preDefinedUnit == true) {
          unit = event.unit
      }
      name = event.name;
      value = event.value;
      code = event.code;
    } else {
      name = event.target.name;
      value = event.target.value;
    }

    const newItems = [...items];

    newItems[index][name] = value;

    if (code != null) {
      newItems[index]["code"] = code;
    }

    if (unit != null) {
      newItems[index]["unit"] = unit;
    }

    newItems[index]["preDefinedUnit"] = event.preDefinedUnit == true ? true : false

    const quantity = parseFloat(newItems[index].quantity);
    const price = parseFloat(newItems[index].price);

    if (!isNaN(quantity) && !isNaN(price)) {
      newItems[index].total = (quantity * price).toFixed(2);
    } else {
      newItems[index].total = "";
    }


    setItems(newItems);
    calculaValorTotal(newItems);
  };

  const calculaValorTotal = (itemsToCalculate) => {
    const total = itemsToCalculate.reduce((acc, item) => {
      const itemTotal = parseFloat(item.total);
      return acc + (isNaN(itemTotal) ? 0 : itemTotal);
    }, 0);
    setCompraTotal(total.toFixed(2));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const purchase = {
      supermarket: {
        id: selectedMarket.id,
        store: selectedMarket.name,
        cnpj: selectedMarket.cnpj,
        city: "",
        state: "",
      },
      accessKey: "", //TODO adicionar chave de acesso aqui quando for consultar. Chave de acesso é o ID da compra,
      date: date,
      totalPrice: purchaseTotal,
      products: items.map(i => {
        if (i.unit == null) {
          return {...i, unit: 'UN'}
        }

        return i;
      })
    };


    setIsSendingRequest(true)
    registerManualPurchase(purchase).then(resp => {
      toast.success("Compra registrada!!")
      dispatch({ type: "ADD_PURCHASE", payload: resp.data.data});
      toggleModal()
    }).catch(err => {
      toast.error("Não foi possível salvar a compra")
    }).finally(() => {
      setIsSendingRequest(false)
    })
  };

  const [marketRequest, setMarketRequest] = useState([]);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [catalogList, setCatalogList] = useState([]);

  useEffect(() => {
    const marketsRequest = getAllMarkets()
      .then(
        resp => {
          let listaMercadosFormatado =
            resp.data.data.map(market => ({
              id: market.id,
              name: market.store,
              cnpj: market.cnpj,
              isManual: market.isManual,
            }));

          setMarketRequest(
            listaMercadosFormatado
          )
        }
      ).catch(e => {
        toast.error("Não foi possível pegar a lista de mercados cadastrados")
      });

  }, []);

  useEffect(() => {
    if (selectedMarket != null && selectedMarket.id != null) {
      getAllCatalogByMarketId(selectedMarket.id).then(
        resp => {
          setCatalogList(resp.data.data);
        }
      ).catch(e => {
        toast.error("Não foi possível pegar a lista de items do mercado cadastrado?")
      })
    } else {
      setCatalogList(null)
    }
  }, [selectedMarket])


  return (
    <section className="modal-container" role="dialog" aria-modal="true">
      <form className="modal-form">
        <button type="button" className="modal-close" onClick={toggleModal} aria-label="Fechar modal">
          ×
        </button>

        <header className="modal-header">
          <h2 className="modal-title">Adicionar Nova Compra</h2>
          <p className="modal-description">Registre os detalhes da sua compra incluindo local, itens e valores</p>
        </header>

        <fieldset className="modal-fieldset">
          <div className="form-group">
            <label htmlFor="purchase-date">Data da Compra</label>
            <input id="purchase-date" type="date" value={date} disabled={isSendingRequest} onChange={(e) => setDate(e.target.value)} />
            <span className="form-hint">Selecione quando a compra foi realizada</span>
          </div>

          <div className="form-group">
            <label htmlFor="market-name">Mercado</label>
            <SelectMarket id="market-name" className="market-select" classNamePrefix={"select"} disabled={isSendingRequest}
              options={
                marketRequest.map(market => ({ value: market.id, label: market.name, cnpj: market.cnpj }))
              }
              onChange={setSelectedMarket}
            />

          </div>
        </fieldset>

        <div className="add-item-container">
          <button type="button" className="btn-add-item" onClick={addItem} disabled={isSendingRequest}>
            <i className="fas fa-plus"></i> Adicionar Item
          </button>
        </div>

        <div className="items-list">
          {items.map((item, index) => (
            <fieldset key={index} className="modal-fieldset-itens">
              <div className="modal-fieldset-itens">
                <div className="form-group">
                  <label>Nome do item</label>
                  <SelectItem name={"name"}
                    catalogList={catalogList}
                    disabled={isSendingRequest}
                    onChangeData={(e) => verificaValor(index, e)}
                    marketId={selectedMarket ? selectedMarket.value : -1}
                  />
                </div>

                <div className="form-group">
                  <label>Quantidade</label>
                  <input
                    type="number"
                    min="0"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => verificaValor(index, e)}
                    disabled={isSendingRequest}
                  />
                </div>

                <div className="form-group">
                  <label>Medida</label>
                  <select className="select-unidade-medida" name="unit" disabled={item.preDefinedUnit} value={item.unit} onChange={(e) => verificaValor(index, e)}>
                    <option value={"UN"} default>Unidade</option>
                    <option value={"KG"}>Kg</option>
                  </select>

                </div>

                <div className="form-group">
                  <label>Preço Unitário</label>
                  <div className="item-price">
                    <span>R$</span>
                    <input
                      type="number"
                      step="0.01"
                      name="price"
                      min={0}
                      value={item.price}
                      onChange={(e) => verificaValor(index, e)}
                      disabled={isSendingRequest}
                    />
                  </div>
                </div>

                <div className="modal-subtotal-actions">
                  <div className="form-group">
                    <label>Total do item</label>
                    <div className="item-price item-total">
                      <span>R$</span>
                      <input type="number" step="0.01" min="0" value={item.total} readOnly disabled />
                    </div>
                  </div>
                  {items.length > 1 && (
                    <button type="button" className="btn-remove-item" onClick={() => removeItem(index)} disabled={isSendingRequest}>
                      <i className="fas fa-trash"></i>
                    </button>
                  )}
                </div>
              </div>
              {items.length > 1 && (
              <div className="progress-item-separator" ></div>
              )}
            </fieldset>
          ))}
        </div>

        <fieldset className="modal-fieldset-total">
          <label>Total Geral</label>
          <div className="item-price">
            <span>R$</span>
            <input type="number" value={purchaseTotal} readOnly />
          </div>
        </fieldset>

        <footer className="form-actions">
          <button type="button" className="btn btn-cancel" onClick={toggleModal} disabled={isSendingRequest}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-save" onClick={handleSubmit} disabled={isSendingRequest}>
            {isSendingRequest ?
              (
                <>
                  <i class="fa-solid fa-spinner fa-spin"></i> <span>Salvando</span>
                </>
              ) : ("Salvar compra")
            }

          </button>
        </footer>
      </form>
    </section>
  );
};

export default Modal;
