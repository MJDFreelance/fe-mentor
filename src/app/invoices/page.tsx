"use client";

import Link from "next/link";
import { useInvoice } from "@/app/invoices/components/InvoiceContext";
import { Checkbox } from "@/components/ui/checkbox";
import IconPlus from "@/app/invoices/icons/icon-plus.svg";
import IconDown from "@/app/invoices/icons/icon-arrow-down.svg";
import IconRight from "@/app/invoices/icons/icon-arrow-right.svg";

const Page = () => {
  const { filteredInvoices, changeView, filters, setFilters } = useInvoice();

  return (
    <main className={`flex flex-col w-full px-6 max-w-[730px] mx-auto`}>
      <section className={`flex items-center py-8 w-full gap-4.5`}>
        <div className={`flex flex-col`}>
          <h1
            className={`font-bold text-[24px] -tracking-[.75px] text-[#0C0E16] group-data-[color-mode=dark]:text-white`}
          >
            Invoices
          </h1>
          <span
            className={`text-[#888EB0] text-[13px] leading-[15px] -tracking-[.1px] group-data-[color-mode=dark]:text-[#DFE3FA]`}
          >
            {filteredInvoices.length} invoices
          </span>
        </div>
        <details
          className={`group relative group-data-[color-mode=dark]:text-white ml-auto cursor-pointer`}
        >
          <summary className={`flex items-center list-none p-4`}>
            Filter <span className={`max-md:hidden`}>by status</span>
            <IconDown className={`ml-4`} />
          </summary>
          <form
            className={`translate-y-4 hidden absolute group-focus-within:grid grid-cols-[auto_auto] gap-3 p-6 bg-[#252945]`}
          >
            <Checkbox
              id={`draft`}
              checked={filters.draft}
              onCheckedChange={(value) =>
                setFilters((prev) => ({ ...prev, draft: value === true }))
              }
            />{" "}
            <label htmlFor={`draft`}>Draft</label>
            <Checkbox
              id={`pending`}
              checked={filters.pending}
              onCheckedChange={(value) =>
                setFilters((prev) => ({ ...prev, pending: value === true }))
              }
            />{" "}
            <label htmlFor={`pending`}>Pending</label>
            <Checkbox
              id={`paid`}
              checked={filters.paid}
              onCheckedChange={(value) =>
                setFilters((prev) => ({ ...prev, paid: value === true }))
              }
            />{" "}
            <label htmlFor={`paid`}>Paid</label>
          </form>
        </details>
        <button
          onClick={() => changeView({ id: undefined, view: "add" })}
          className={`flex items-center bg-[#7C5DFA] text-white p-1.5 rounded-full gap-2
                            font-bold text-[15px] leading-[1] -tracking-[.25px]`}
        >
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full bg-white`}
          >
            <IconPlus />
          </div>{" "}
          New <span></span>
        </button>
      </section>
      {filteredInvoices.length === 0 && (
        <div
          className={`grid items-center justify-center w-full h-full rounded-[8px] `}
        >
          <div className={`flex flex-col gap-16 items-center`}>
            <img
              src={`/invoices/illustration-empty.svg`}
              className={`mb-6`}
              alt={`empty`}
            />
            <header className={`flex flex-col gap-6 text-center text-white`}>
              <h1 className={`font-bold text-[24px] -tracking-[.75px]`}>
                There is nothing here
              </h1>
              <p className={`text-[13px] leading-[15px] -tracking-[.1px]`}>
                Create an invoice by clicking the
                <br /> New Invoice button and get started
              </p>
            </header>
          </div>
        </div>
      )}
      <ul
        className={`grid grid-areas-[id_name|date_status|price_status] md:grid-areas-[id_date_name_price_status] w-full gap-4`}
      >
        {filteredInvoices.map((invoice) => (
          <li
            key={invoice.id}
            className={`grid grid-cols-subgrid col-span-2 md:col-span-6`}
          >
            <Link
              href={`/invoices/${invoice.id}`}
              className={`col-span-2 md:col-span-6 group-data-[color-mode=dark]:bg-[#1E2139] grid gap-y-4 bg-white rounded-[8px] w-full p-6 items-center
                                grid-cols-subgrid`}
            >
              <h2
                className={`group-data-[color-mode=dark]:text-white grid-area-[id] text-[#0C0E16] font-bold text-[15px] leading-[1] -tracking-[.25px]`}
              >
                {invoice.id}
              </h2>
              <span
                className={`group-data-[color-mode=dark]:text-[#DFE3FA] grid-area-[name] max-md:justify-self-end text-[13px] leading-[15px] -tracking-[.1px] text-[#858BB2]`}
              >
                {invoice.clientName}
              </span>
              <span
                className={`group-data-[color-mode=dark]:text-white grid-area-[date] max-md:mt-4 text-[13px] leading-[15px] -tracking-[.1px] text-[#888EB0]`}
              >
                Due {invoice.createdAt}
              </span>
              <span
                className={`group-data-[color-mode=dark]:text-white grid-area-[price] text-[#0C0E16] font-bold text-[15px] leading-[24px] -tracking-[.25px]`}
              >
                {invoice.total}
              </span>
              <span
                data-status={invoice.status}
                className={`grid-area-[status] flex gap-4 items-center justify-center max-md:justify-self-end w-[104px] py-[14px] bg-[rgba(51,214,159,.0571)]
                                text-[#33D69F] font-bold text-[15px] leading-[1] -tracking-[.25px] max-md:mt-4
                                data-[status=pending]:bg-[rgba(255,143,0,.0571)] data-[status=pending]:text-[#FF8F00]
                                data-[status=draft]:bg-[rgba(223,227,250,.0571)] data-[status=draft]:text-[#DFE3FA]
                                    content-[''] before:w-2 before:h-2 before:rounded-full 
                                    data-[status=pending]:before:bg-[#FF8F00] data-[status=draft]:before:bg-[#DFE3FA] data-[status=paid]:before:bg-[#33D69F]`}
              >
                {invoice.status}
              </span>
              <IconRight className={`max-md:hidden`} />
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Page;
