import { useEffect, useState } from "react";
import Select from "react-select";

export const SelectMarket = ({ options, onChange, disabled }) => {

    const [customInputName, setCustomInputName] = useState("");
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [finalValue, setFinalValue] = useState({})

    const eventOptions =
    {
        label: "",
        options: [
            { value: null, label: "Adicionar novo mercado", },
        ]
    }

    function onChangeOption(optionSelected) {
        if (optionSelected.value == null) {
            setFinalValue({ id: null, name: "", cnpj: "" })
            setShowCustomInput(true)
            return
        } else {
            setShowCustomInput(false)
        }
        setFinalValue({ id: optionSelected.value, name: optionSelected.label, cnpj: optionSelected.cnpj })
    }

    function onChangeInput(inputValue) {
        setFinalValue({ id: null, name: inputValue, cnpj: "" })
    }

    useEffect(() => {
        onChange(finalValue)
    }, [finalValue])

    function isToShowInput() {
        if (options.length == 0) return true;
        if (showCustomInput) return true;

    }

    function isToShowSelect() {
        return options.length > 0;
    }

    return (
        <>
            {isToShowSelect() ? (<Select className={"market-select"} classNamePrefix={"select"}
                options={[eventOptions,
                    {
                        label: "mercados",
                        options: [
                            ...options
                        ]
                    }
                ]}
                onChange={onChangeOption}
               isDisabled={disabled} 
            />

            ) : <></>}

            {isToShowInput() ? (
                <>
                    <input
                        id="market-name"
                        type="text"
                        placeholder="Ex: Carrefour"
                        onChange={(e) => onChangeInput(e.target.value)}
                        disabled={disabled}
                    />
                    <span className="form-hint">Ex: Supermercado Extra, Carrefour</span>
                </>
            )
                : null}
        </>
    )

}