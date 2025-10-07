import { useEffect, useState } from "react";
import Select from "react-select";
import { getAllCatalogByMarketId } from "../../../services/nfceService";
import "./SelectItem.css"

export const SelectItem = ({ name, marketId, onNoneBelow, onChangeData, catalogList }) => {

    const [isLoading, setIsloading] = useState(false)

    const [defaultValue, setDefaultValue] = useState(null)
    const [value, setValue] = useState(null);
    const [customInputName, setCustomInputName] = useState("");
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [finalValue, setFinalValue] = useState({ type: "item-name", code: "", value: "", name: name })
    const [catalogListOld, setCatalogListOld] = useState(catalogList)

    const eventOptions =
    {
        label: "",
        options: [
            { value: -2, label: "Adicionar novo item", },
        ]
    }

    useEffect(() => {
        if (JSON.stringify(catalogListOld) != JSON.stringify(catalogList)) {
            console.log(catalogListOld)
            console.log(catalogList)
            console.log("eh igual", catalogListOld == catalogList)
            changeValue(null)
        }

       setCatalogListOld(catalogList) 
        console.log("catalogList")
        console.log(catalogList)
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
        console.log("uE CIN")
        setFinalValue({ type: "item-name", code: null, "value": customInputName, name: name })
    }, [customInputName])

    useEffect(() => {
        if (value != null && value.value != -2)
            setFinalValue({ type: "item-name", code: value ? value.value : "", value: value ? value.label : "", name: name })
    }, [value])

    useEffect(() => {
        if (showCustomInput && showCustomInput != "")
            setCustomInputName("")
    }, [showCustomInput])

    useEffect(() => {
        console.log('uE FV')
        console.log(finalValue)
        onChangeData(finalValue)
    }, [finalValue])

    function reset() {
        setDefaultValue(null)
        setValue(null)
        setShowCustomInput(false)
        setCustomInputName("")
        setFinalValue({ type: "item-name", code: "", value: "" })
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
                                ...catalogList ? catalogList.map(cat => ({ value: cat.CODE, label: cat.name })) : []
                            ]
                        }
                    ]}
                    onChange={changeValue}
                    defaultValue={defaultValue}
                    isLoading={isLoading}
                    value={value}
                    placeholder={"Selecione..."}

                />
            ) : <></>}

            {canShowInput() ? (<input type="text" name={name} onChange={(e) => setCustomInputName(e.target.value)} />) : null}
        </>
    )
}