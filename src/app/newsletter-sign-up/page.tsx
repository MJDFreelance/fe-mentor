import {Form} from "@/app/newsletter-sign-up/components/Form";

const Page = () => {
    return (
        <>
            <article className={`flex flex-col w-max md:flex-row-reverse bg-white max-md:min-h-screen text-[#242742] 
                    text-[16px] leading-[1.5] md:p-6 md:rounded-[36px] md:gap-16 hidden`}>
                <img src={`/newsletter-sign-up/illustration-sign-up-desktop.svg`} className={`w-full max-md:hidden`}/>
                <img src={`/newsletter-sign-up/illustration-sign-up-mobile.svg`} className={`w-full md:hidden`}/>
                <section className={`grid gap-6 w-full py-10 px-6 md:ml-10`}>
                    <h2 className={`font-bold text-[40px]`}>Stay updated!</h2>
                    <p>Join 60,000+ product managers receiving monthly updates on:</p>
                    <ul className={`flex flex-col gap-2.5 mb-4`}>
                        <li className={`flex items-start`}>
                            <img src={`/newsletter-sign-up/icon-list.svg`} className={`mr-3`}/>
                            Product discovery and building what matters
                        </li>
                        <li className={`flex items-start`}>
                            <img src={`/newsletter-sign-up/icon-list.svg`} className={`mr-3`}/>
                            Measuring to ensure updates are a success
                        </li>
                        <li className={`flex items-start`}>
                            <img src={`/newsletter-sign-up/icon-list.svg`} className={`mr-3`}/>
                            And much more!
                        </li>
                    </ul>
                    <Form />
                </section>
            </article>
            <article className={`flex flex-col bg-white max-md:min-h-screen text-[#242742] text-[16px] leading-[1.5] 
                    px-6 py-5 md:p-16 md:h-max md:w-max rounded-[36px]`}>
                <div className={`flex-1 flex flex-col justify-center gap-6`}>
                    <img src={`/newsletter-sign-up/icon-list.svg`} className={`mr-3 h-16 w-16 mb-4`}/>
                    <h2 className={`font-bold text-[40px] md:max-w-[10ch] leading-[1]`}>Thanks for subscribing!</h2>
                    <p className={`mb-full text-[16px] leading-[1.5] max-w-[40ch]`}>
                        A confirmation email has been sent to <span className={`font-bold`}>ash@loremcompany.com</span>. Please open it and click the button
                        inside to confirm your subscription
                    </p>
                </div>
                <button className={`mt-4 text-white bg-[#242742] py-4.5 rounded-[8px] md:mt-10
                                hover:bg-gradient-to-r from-[#FF6A3A] to-[#FF527B] hover:shadow-[0_16px_32px_#FF6155]`}>Dismiss
                    message
                </button>
            </article>
        </>
    );
};

export default Page;