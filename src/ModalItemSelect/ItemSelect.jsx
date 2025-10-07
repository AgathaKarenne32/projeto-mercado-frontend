import { useEffect, useState } from "react";
import Select from "react-select";
import { getAllCatalogByMarketId } from "../../services/nfceService";

//
export const SelectItem = ({ marketId, onNoneBelow }) => {


    const [selectedOption, setSelectedOption] = useState(null)
    const [catalogList, setCatalogList] = useState([]);

    let marketIdOld;
    useEffect(() => {
        console.log("opa")
        if (marketId == -1) {
            onNoneBelow()
            return;
        }

        console.log("passow")
        console.log(marketId);
        console.log(marketIdOld)

        if (marketIdOld == marketId) return;

        console.log("passow2")


        getAllCatalogByMarketId(marketId).then(
            resp => {
                console.log(resp.data.data);
                setCatalogList(resp.data.data);
            }
        )

        marketIdOld = marketId;
    }, [marketId])

    function alow(ll) {
        setSelectedOption(ll)
        console.log(ll)
    }

    return (<Select className="market-select" classNamePrefix={"select"}
        options={[
            { id: -1, label: "Adicionar novo mercado" }, ...
            catalogList.map(cat => ({ value: cat.CODE, label: cat.name }))
        ]}
        onChange={alow}
        defaultValue={selectedOption}

    />)
}
