import { useMemo } from "react";

export const useTableUtils = () => {
    const currencyFormatter = useMemo(() => new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }), []);

    const extractNumber = (val) => {
        if (!val) return 0;
        if (typeof val === "number") return val;
        const cleaned = val.toString().replace(/[^0-9,.-]/g, "").replace(",", ".");
        const parsed = Number(cleaned);
        return Number.isNaN(parsed) ? 0 : parsed;
    };

    const extractQty = (item) => {
        const keys = ["quantity", "quantidade", "qty", "qtd", "amount"];
        for (const key of keys) {
            if (item && Object.prototype.hasOwnProperty.call(item, key)) {
                return extractNumber(item[key]);
            }
        }
        return 0;
    };

    const parseItems = (conteudo) => {
        try {
            if (typeof conteudo === "string") {
                const parsed = JSON.parse(conteudo);
                return Array.isArray(parsed) ? parsed : parsed.items || [];
            } else if (Array.isArray(conteudo)) {
                return conteudo;
            } else {
                return conteudo?.items || [];
            }
        } catch {
            return [];
        }
    };

    return {
        currencyFormatter,
        extractNumber,
        extractQty,
        parseItems
    };
};