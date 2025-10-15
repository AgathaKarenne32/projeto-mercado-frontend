import { useEffect, useState } from "react";
import Select from "react-select";
import { getAllCatalogByMarketId } from "../../../services/nfceService";
import "./SelectItem.css"

export const SelectItem = ({ name, marketId, disabled, onChangeData, catalogList }) => {

    const [isLoading, setIsloading] = useState(false)

    const [defaultValue, setDefaultValue] = useState(null)
    const [value, setValue] = useState(null);
    const [customInputName, setCustomInputName] = useState("");
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [finalValue, setFinalValue] = useState({ type: "item-name", code: "", value: "", preDefinedUnit: false, unit: "",  me: name })
    const [catalogListOld, setCatalogListOld] = useState(catalogList)

    const eventOptions =
    {
        label: "",
        options: [
            { value: -2, label: "Adicionar novo item", preDefinedUnit: false },
        ]
    }

    useEffect(() => {
        if (JSON.stringify(catalogListOld) != JSON.stringify(catalogList)) {
            changeValue(null)
        }

       setCatalogListOld(catalogList) 
    }, [catalogList])


    let marketIdOld;
    useEffect(() => {
        if (marketId == -1 || marketId == null) {
            return;
        }

        if (marketIdOld == marketId) return;

        //Trocou de mercado
        setIsloading(true)

        reset()
        loadData()
        marketIdOld = marketId;

        setIsloading(false)

    }, [marketId])

    useEffect(() => {
        setFinalValue({ type: "item-name", code: null, "value": customInputName, name: name, preDefinedUnit: false })
    }, [customInputName])

    useEffect(() => {
        if (value != null && value.value != -2)
            setFinalValue({ type: "item-name", code: value ? value.value : "", value: value ? value.label : "", name: name, preDefinedUnit: true, unit: value.unit })
    }, [value])

    useEffect(() => {
        if (showCustomInput && showCustomInput != "")
            setCustomInputName("")
    }, [showCustomInput])

    useEffect(() => {
        onChangeData(finalValue)
    }, [finalValue])

    function reset() {
        setDefaultValue(null)
        setValue(null)
        setShowCustomInput(false)
        setCustomInputName("")
        setFinalValue({ type: "item-name", code: "", value: "", preDefinedUnit: false })
    }

    function changeValue(value) {
        setValue(value)
        if (value == eventOptions.options[0]) {
            setShowCustomInput(true)
        } else {
            setShowCustomInput(false)
        }
    }

    function canShowInput() {
        if (!catalogList) return true;
        if (catalogList && showCustomInput) return true;

        return false;

    }


    return (
        <>
            {catalogList != null ? (
                <Select className={"item-market-select"} classNamePrefix={"select"}
                    options={[eventOptions,
                        {
                            label: "itens",
                            options: [
                                ...catalogList ? catalogList.map(cat => ({ value: cat.CODE, label: cat.name, preDefinedUnit: true, unit: cat.unit })) : []
                            ]
                        }
                    ]}
                    onChange={changeValue}
                    defaultValue={defaultValue}
                    isLoading={isLoading}
                    value={value}
                    placeholder={"Selecione..."}
                    isDisabled={disabled}

                />
            ) : <></>}

            {canShowInput() ? (<input type="text" name={name} onChange={(e) => setCustomInputName(e.target.value)} disabled={disabled}/>) : null}
        </>
    )
}