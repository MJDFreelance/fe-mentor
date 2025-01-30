"use client"

import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {useInvoice} from "@/app/invoices/components/InvoiceContext";
import {Invoice} from "@/app/invoices/types";

type ValueType = {
    filteredInvoices: Invoice[]|undefined,
}

const FilterContext = createContext<ValueType>({filteredInvoices:undefined});
export const useFilter = () => useContext(FilterContext);
export const FilterProvider = (props: { children: ReactNode }) => {
    const {invoiceArray} = useInvoice();
    const [filteredInvoices, setFilteredInvoices] = useState(invoiceArray);

    useEffect(() => {
        setFilteredInvoices(invoiceArray);
    }, [invoiceArray]);

    return (
        <FilterContext.Provider value={{filteredInvoices}}>
            {props.children}
        </FilterContext.Provider>
    );
};
