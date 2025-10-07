import { useEffect, useState } from "react";
import Select from "react-select";

export const SelectMarket = ({ options, onChange }) => {

    const [customInputName, setCustomInputName] = useState("");
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [finalValue, setFinalValue] = useState({})

    const eventOptions =
    {
        label: "",
        options: [
            { value: null, label: "Adicionar novo item", },
        ]
    }

    function onChangeOption(optionSelected) {
        if (optionSelected.value == null) {
            setFinalValue({ id: null, name: "" })
            setShowCustomInput(true)
            return
        } else {
            setShowCustomInput(false)
        }
        setFinalValue({ id: optionSelected.value, name: optionSelected.label })
    }

    function onChangeInput(inputValue) {
        if (showCustomInput) {
            setFinalValue({ id: null, name: inputValue })
        }
    }

    useEffect(() => {
        onChange(finalValue)
    }, [finalValue])

    return (
        <>
            <Select className={"market-select"} classNamePrefix={"select"}
                options={[eventOptions,
                    {
                        label: "itens",
                        options: [
                            ...options
                        ]
                    }
                ]}
                onChange={onChangeOption}
            />

            {showCustomInput ? (
                <input
                    id="market-name"
                    type="text"
                    placeholder="Ex: Carrefour"
                    onChange={(e) => onChangeInput(e.target.value)}
                />
            )
                : null}
        </>
    )

}