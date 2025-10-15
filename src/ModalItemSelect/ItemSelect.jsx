import { useEffect, useState } from "react";
import Select from "react-select";
import { getAllCatalogByMarketId } from "../../services/nfceService";

//
export const SelectItem = ({ marketId, onNoneBelow }) => {


    const [selectedOption, setSelectedOption] = useState(null)
    const [catalogList, setCatalogList] = useState([]);

    let marketIdOld;
    useEffect(() => {
        if (marketId == -1) {
            onNoneBelow()
            return;
        }
        if (marketIdOld == marketId) return;
        getAllCatalogByMarketId(marketId).then(
            resp => {
                setCatalogList(resp.data.data);
            }
        )

        marketIdOld = marketId;
    }, [marketId])

    function selectOption(ll) {
        setSelectedOption(ll)
    }

    return (<Select className="market-select" classNamePrefix={"select"}
        options={[
            { id: -1, label: "Adicionar novo mercado" }, ...
            catalogList.map(cat => ({ value: cat.CODE, label: cat.name }))
        ]}
        onChange={selectOption}
        defaultValue={selectedOption}

    />)
}
