import {ReactNode} from "react";
import {InvoiceProvider} from "@/app/invoices/components/InvoiceContext";
import {FilterProvider} from "@/app/invoices/components/FilterContext";
import {Sheet, SheetProvider} from "@/app/invoices/components/Sheet";
import {Form} from "@/app/invoices/components/Form";
import {DarkProvider} from "@/app/invoices/components/DarkContext";

const Layout = ({children}:{children:ReactNode}) => {
    return (
        <DarkProvider>
            <InvoiceProvider>
                <FilterProvider>
                    <SheetProvider>
                        <section className={`bg-[#F8F8FB] group-data-[color-mode=dark]:bg-[#141625] flex max-xl:flex-col min-h-screen max-w-screen w-full font-[LeagueSpartan]`}>
                            <Sheet >
                                <Form />
                            </Sheet>
                            {children}
                        </section>
                    </SheetProvider>
                </FilterProvider>
            </InvoiceProvider>
        </DarkProvider>
    );
};

export default Layout;