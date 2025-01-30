"use client"

import {useInvoice} from "@/app/invoices/components/InvoiceContext";
import {useParams, useRouter} from "next/navigation";
import {NextGoBack} from "@/app/invoices/components/NextGoBack";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";

const Page = () => {
    const {invoiceArray, changeView, markAsPaid, deleteInvoice} = useInvoice();
    const params = useParams(); // Access the dynamic route parameters

    const id = params.id;
    const invoice = invoiceArray.find(invoice => invoice.id === id)??({} as any);

    const router = useRouter();

    const handleDelete = (id:string) => {
        router.back(); // Navigates to the previous page
        deleteInvoice(id);
    };

    return (
        <main className={`flex flex-col gap-7 w-full max-w-[730px] mx-auto`}>
            <NextGoBack />
            {invoice?.senderAddress && <>
                <section
                    className={`group-data-[color-mode=dark]:bg-[#1E2139] flex items-center justify-between py-6 bg-white mx-6 rounded-[8px] gap-5`}>
                    <div className={`ml-6 text-[13px] leading-[15px] -tracking-[.1px] text-[#858BB2]`}>
                        Status
                    </div>
                    <span data-status={invoice.status}
                        className={`max-md:mr-6 grid-area-[status] flex items-center justify-center max-md:justify-self-end w-[104px] py-[14px] 
                bg-[rgba(51,214,159,.0571)] text-[#33D69F] font-bold text-[15px] leading-[1] -tracking-[.25px]
                data-[status=pending]:bg-[rgba(255,143,0,.0571)] data-[status=pending]:text-[#FF8F00]
                                data-[status=draft]:bg-[rgba(223,227,250,.0571)] data-[status=draft]:text-[#DFE3FA]
                                    content-[''] before:w-2 before:h-2 before:rounded-full gap-2
                                    data-[status=pending]:before:bg-[#FF8F00] data-[status=draft]:before:bg-[#DFE3FA] data-[status=paid]:before:bg-[#33D69F]`}>{invoice.status}</span>
                    <div
                        className={`group-data-[color-mode=dark]:bg-[#1E2139] flex px-6 py-5 bg-white max-md:w-full gap-2 max-md:fixed max-md:bottom-0 max-md:-ml-6 md:ml-auto`}>
                        <button className={`py-4.5 px-6 flex-1 rounded-full bg-[#F9FAFE] group-data-[color-mode=dark]:bg-[#252945] 
                        group-data-[color-mode=dark]:text-[#DFE3FA] text-[#7E88C3]  font-bold text-[15px] leading-[15px] -tracking-[.25px]`}
                                onClick={() => changeView({id: invoice.id, view: 'edit'})}
                        >Edit
                        </button>
                        <Dialog>
                            <DialogTrigger
                                className={`py-4.5 px-6 flex-1 rounded-full bg-[#EC5757] text-white font-bold text-[15px] leading-[15px] -tracking-[.25px]`}>Delete</DialogTrigger>
                            <DialogContent className={`p-12 w-fit max-w-fit bg-[#1E2139] border-0`}>
                                <DialogHeader
                                    className={`flex flex-col gap-3 w-fit group-data-[color-mode=dark]:bg-[#1E2139]`}>
                                    <DialogTitle className={`text-white`}>Confirm Deletion</DialogTitle>
                                    <DialogDescription className={`w-[60ch]`}>
                                        Are you sure you want to delete invoice #XM9141? This action cannot be undone.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <button onClick={() => {
                                    }}
                                            className={`flex-grow-0 py-4.5 px-6 flex-1 rounded-full bg-[#F9FAFE] text-[#7E88C3] 
                                        font-bold text-[15px] leading-[15px] -tracking-[.25px]`}>Cancel
                                    </button>
                                    <button onClick={() => handleDelete(invoice.id)}
                                            className={`flex-grow-0 py-4.5 px-6 flex-1 rounded-full bg-[#EC5757] text-white 
                                        font-bold text-[15px] leading-[15px] -tracking-[.25px]`}>Delete
                                    </button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <button className={`py-4.5 px-6 text-nowrap flex-1 rounded-full bg-[#7C5DFA] text-white font-bold 
                    text-[15px] leading-[15px] -tracking-[.25px]`}
                                onClick={() => markAsPaid(invoice.id)}>Mark as Paid
                        </button>
                    </div>
                </section>
                <section className={`group-data-[color-mode=dark]:bg-[#1E2139] grid p-6 bg-white mx-6 rounded-[8px] gap-y-8 text-[13px] leading-[15px] -tracking-[.1px] text-[#7E88C3]
                group-data-[color-mode=dark]:text-[#DFE3FA]
                grid-areas-[id_air|address_air|date_bill|sent_sent|items_items] md:grid-areas-[id_air_air_address|date_bill_sent_sent|items_items_items_items]`}>
                    <div className={`flex flex-col gap-3 grid-area-[id]`}>
                    <span
                        className={`font-bold text-[15px] leading-[15px] -tracking-[.25px] text-[#0C0E16] group-data-[color-mode=dark]:text-white`}>
                        <span className={`text-[#7E88C3] `}>#</span>{invoice.id}</span>
                        <span className={`text-[13px] leading-[15px] -tracking-[.1px] `}>{invoice.description}</span>
                    </div>
                    <address className={`flex flex-col grid-area-[address] not-italic`}>
                        <section>{invoice.senderAddress.street}</section>
                        <section>{invoice.senderAddress.city}</section>
                        <section>{invoice.senderAddress.postCode}</section>
                        <section>{invoice.senderAddress.country}</section>
                    </address>
                    <dl className={`flex flex-col justify-between grid-area-[date]`}>
                        <div className={`flex flex-col gap-3`}>
                            <dt>Invoice Date</dt>
                            <dd className={`font-bold text-[20px] leading-[15px] -tracking-[.25px] text-[#0C0E16] group-data-[color-mode=dark]:text-white`}>{invoice.createdAt}</dd>
                        </div>
                        <div className={`flex flex-col gap-3`}>
                            <dt>Payment Due</dt>
                            <dd className={`font-bold text-[20px] leading-[15px] -tracking-[.25px] text-[#0C0E16] group-data-[color-mode=dark]:text-white`}>{invoice.paymentDue}</dd>
                        </div>
                    </dl>
                    <div className={`flex flex-col grid-area-[bill] gap-3`}>
                        <dt>Bill To</dt>
                        <dd className={`flex flex-col gap-2`}>
                            <span
                                className={`font-bold text-[20px] leading-[15px] -tracking-[.25px] text-[#0C0E16] group-data-[color-mode=dark]:text-white`}>{invoice.clientName}</span>
                            <address className={`not-italic`}>
                                <section>{invoice.clientAddress.street}</section>
                                <section>{invoice.clientAddress.city}</section>
                                <section>{invoice.clientAddress.postCode}</section>
                                <section>{invoice.clientAddress.country}</section>
                            </address>
                        </dd>
                    </div>
                    <div className={`grid-area-[sent] flex flex-col gap-3`}>
                        <dt>Sent to</dt>
                        <dd className={`font-bold text-[20px] leading-[15px] -tracking-[.25px] text-[#0C0E16] group-data-[color-mode=dark]:text-white`}>{invoice.clientEmail}</dd>
                    </div>
                    <section
                        className={`grid group-data-[color-mode=dark]:bg-[#252945] grid-cols-subgrid grid-area-[items] md:bg-[#F9FAFE] rounded-t-[8px]`}>
                        <header
                            className={`grid grid-cols-subgrid col-span-4 max-md:hidden p-8 text-[13px] leading-[18px] -tracking-[.1px]`}>
                            <span className={``}>Item Name</span>
                            <span className={`justify-self-end`}>QTY.</span>
                            <span className={`justify-self-end`}>Price</span>
                            <span className={`justify-self-end`}>Total</span>
                        </header>
                        <ul className={`grid grid-cols-subgrid max-md:p-6 md:px-8 col-span-2 md:col-span-4 rounded-t-[8px]`}>
                            {invoice.items.map((item: {
                                name: string,
                                quantity: number,
                                price: number,
                                total: number
                            }, index: number) =>
                                <li key={`item-${index}`}
                                    className={`grid grid-cols-subgrid col-span-2 md:col-span-4 items-center gap-y-2 md:mb-8`}>
                                    <h3 className={`font-bold text-[15px] leading-[15px] -tracking-[.25px] text-[#0C0E16] group-data-[color-mode=dark]:text-white`}>{item.name}</h3>
                                    <span
                                        className={`font-bold text-[15px] leading-[15px] -tracking-[.25px] text-[#7E88C3] group-data-[color-mode=dark]:text-[#DFE3FA]  max-md:hidden justify-self-end`}>{item.quantity}</span>
                                    <span
                                        className={`font-bold max-md:row-span-2 text-[15px] leading-[15px] -tracking-[.25px] text-[#0C0E16] group-data-[color-mode=dark]:text-white justify-self-end`}>{item.price}</span>
                                    <span
                                        className={`font-bold text-[15px] leading-[15px] -tracking-[.25px] text-[#7E88C3] group-data-[color-mode=dark]:text-[#DFE3FA] md:justify-self-end`}>
                                <span className={`md:hidden`}>{item.quantity} x</span>{item.price}</span>
                                </li>)}
                        </ul>
                        <div
                            className={`group-data-[color-mode=dark]:bg-[#0C0E16] grid grid-cols-subgrid col-span-2 md:col-span-4 p-6 text-white bg-[#373B53] rounded-b-[8px] items-center`}>
                            <span
                                className={`text-[13px] leading-[18px]-tracking-[.1px] md:col-span-2`}>Grand Total</span>
                            <span
                                className={`justify-self-end font-bold text-[24px] leading-[32px] md:col-span-2 -tracking-[.5px]`}>£ 556.00</span>
                        </div>
                    </section>
                </section>
            </>}
        </main>
    );
};

export default Page;