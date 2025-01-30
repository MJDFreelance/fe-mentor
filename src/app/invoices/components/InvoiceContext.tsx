"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import data from "@/app/invoices/data.json";
import { Invoice } from "@/app/invoices/types";
import { arrayToRecord } from "@/lib/utilities/data";

type ValueType = {
  createInvoice: (invoice: Invoice) => void;
  updateInvoice: (invoice: Invoice) => void;
  deleteInvoice: (id: string) => void;
  invoiceArray: Invoice[];
  viewMode: { invoice: Invoice | undefined; view: "edit" | "add" } | undefined;
  changeView: (
    value: { id: string | undefined; view: "edit" | "add" } | undefined,
  ) => void;
  markAsPaid: (id: string) => void;
  filters: {
    paid: boolean | undefined;
    draft: boolean | undefined;
    pending: boolean | undefined;
  };
  setFilters: Dispatch<
    SetStateAction<{
      paid: boolean | undefined;
      draft: boolean | undefined;
      pending: boolean | undefined;
    }>
  >;
  filteredInvoices: Invoice[];
};

const InvoiceContext = createContext<ValueType>({
  createInvoice: () => {
    throw Error("createInvoice not implemented");
  },
  updateInvoice: () => {
    throw Error("updateInvoice not implemented");
  },
  deleteInvoice: () => {
    throw Error("deleteInvoice not implemented");
  },
  invoiceArray: [],
  viewMode: undefined,
  changeView: () => {
    throw Error("changeView not implemented");
  },
  markAsPaid: () => {
    throw Error("markAsPaid not implemented");
  },
  filters: { paid: true, draft: true, pending: true },
  setFilters: () => {
    throw Error("setFilters not implemented");
  },
  filteredInvoices: [],
});
export const useInvoice = () => useContext(InvoiceContext);
export const InvoiceProvider = (props: { children: ReactNode }) => {
  const [invoices, setInvoices] = useState<Record<string, Invoice>>(
    arrayToRecord(data),
  );
  const [viewMode, setViewMode] = useState<
    { invoice: Invoice | undefined; view: "edit" | "add" } | undefined
  >();
  const [filters, setFilters] = useState<{
    paid: boolean | undefined;
    draft: boolean | undefined;
    pending: boolean | undefined;
  }>({ paid: true, draft: true, pending: true });

  const filteredInvoices = useMemo(() => {
    return Object.values(invoices).filter((invoice) => {
      if (filters.paid && invoice.status === "paid") {
        return true;
      }
      if (filters.draft && invoice.status === "draft") {
        return true;
      }
      if (filters.pending && invoice.status === "pending") {
        return true;
      }
      return false;
    });
  }, [invoices, filters]);

  useEffect(() => {
    console.log("filters", filters);
  }, [filters]);

  const changeView = (
    value: { id: string | undefined; view: "edit" | "add" } | undefined,
  ) => {
    if (value?.id) {
      const invoice = invoices[value?.id];
      setViewMode({ invoice, view: value.view });
    } else if (value?.view) {
      setViewMode({ invoice: undefined, view: value.view });
    } else {
      setViewMode(undefined);
    }
  };

  const markAsPaid = (id: string) => {
    const invoice = invoices[id];
    if (invoice) {
      updateInvoice({ ...invoice, status: "paid" });
    }
  };

  const createInvoice = (invoice: Invoice) => {
    const id = Math.random().toFixed(4).toString();
    invoice = { ...invoice, id };
    setInvoices({ ...invoices, [id]: invoice });
  };

  const updateInvoice = (invoice: Invoice) => {
    setInvoices({ ...invoices, [invoice.id]: invoice });
  };

  const deleteInvoice = (id: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [id]: _, ...rest } = invoices;
    setInvoices(rest);
  };

  const invoiceArray = useMemo(() => Object.values(invoices), [invoices]);

  return (
    <InvoiceContext.Provider
      value={{
        createInvoice,
        updateInvoice,
        deleteInvoice,
        invoiceArray,
        viewMode,
        filters,
        filteredInvoices,
        setFilters,
        changeView,
        markAsPaid,
      }}
    >
      {props.children}
    </InvoiceContext.Provider>
  );
};
