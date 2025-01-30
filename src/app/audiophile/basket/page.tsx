"use client";

import { useForm, Controller } from "react-hook-form";
import { Menu } from "@/app/audiophile/components/Menu";
import { NextGoBack } from "@/app/audiophile/components/NextGoBack";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CSSProperties, useEffect, useMemo, useState } from "react";
import { Summary } from "@/app/audiophile/components/Summary";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useCart } from "@/app/audiophile/components/CartContext";
import { formatDecimalAsDollars } from "@/lib/utilities/numeric";
import text from "@/app/audiophile/text.module.css";

const Page = () => {
  const [thankYouOpen, setThankYouOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({});

  const { basketProducts, clearCart } = useCart();

  const onSubmit = (data: any) => {
    console.log(data);
    setThankYouOpen(true);
  };

  const firstProduct = useMemo(
    () => (basketProducts ? basketProducts[0] : {}),
    [basketProducts],
  );

  const method = watch("payment");
  useEffect(() => {
    console.log("method", method);
  }, [method]);

  return (
    <div
      className={`flex flex-col gap-30 md:gap-24 gap-10 max-w-[1440px] w-full text-[13px] tracking-[1px]`}
    >
      <header
        className={`grid bg-[#0E0E0E] grid-cols-2 text-white grid-areas-[menu_menu|hr_hr|main_main] xl:grid-areas-[menu_menu|hr_hr|main_free] grid-rows-[auto_auto_1fr]`}
      >
        <Menu />
        <NextGoBack />
      </header>

      <main
        className={`px-6 flex gap-8 md:px-10 xl:px-[165px] -mt-30 max-xl:flex-col`}
      >
        <form
          className={`grid md:grid-cols-2 flex-1 bg-white px-6 py-6 gap-y-8 font-bold`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1
            className={`${text.h4alt} font-bold text-[32px] leading-[36px] tracking-[1.14px] uppercase`}
          >
            Checkout
          </h1>
          <fieldset
            className={`grid gap-y-4 md:col-span-2 grid-cols-subgrid gap-x-4`}
          >
            <h2
              className={`${text.subtitle} md:col-span-2 uppercase text-[#D87D4A] font-bold leading-[25px] tracking-[.93px]`}
            >
              Billing Details
            </h2>
            <div className={`flex flex-col gap-2`}>
              <label className={`${text.label} rounded-card`}>Name</label>
              <input
                data-error={!!errors.name}
                className={`border px-6 py-4.5 text-normal text-[14px] -tracking-[.25px] outline-0 rounded-[8px]
                                        hover:border-[#D87D4A] focus:border-[#D87D4A] data-[error=true]:border-[#CD2C2C] data-[error=true]:border-[2px]`}
                {...register("name", { required: true })}
                placeholder={`Alexei Ward`}
              />
            </div>
            <div className={`flex flex-col gap-2`}>
              <label className={`${text.label}`}>Email Address</label>
              <input
                data-error={!!errors.email}
                className={`border px-6 py-4.5 text-normal text-[14px] -tracking-[.25px] outline-0 rounded-[8px]
                                        hover:border-[#D87D4A] focus:border-[#D87D4A] data-[error=true]:border-[#CD2C2C] data-[error=true]:border-[2px]`}
                {...register("email", { required: true })}
                placeholder={`alexei@mail.com`}
              />
            </div>
            <div className={`flex flex-col gap-2`}>
              <label className={`${text.label}`}>Phone Number</label>
              <input
                data-error={!!errors.phone}
                className={`border px-6 py-4.5 text-normal text-[14px] -tracking-[.25px] outline-0 rounded-[8px]
                                        hover:border-[#D87D4A] focus:border-[#D87D4A] data-[error=true]:border-[#CD2C2C] data-[error=true]:border-[2px]`}
                {...register("phone", { required: true })}
                placeholder={`+1 202-555-0136`}
              />
            </div>
          </fieldset>
          <fieldset
            className={`grid gap-y-4 md:col-span-2 grid-cols-subgrid gap-x-4`}
          >
            <h2
              className={`${text.subtitle} md:col-span-2 uppercase text-[#D87D4A] font-bold leading-[25px] tracking-[.93px]`}
            >
              shipping info
            </h2>
            <div className={`flex flex-col gap-2 md:col-span-2`}>
              <label className={`${text.label}`}>Address</label>
              <input
                data-error={!!errors.address}
                className={`border px-6 py-4.5 text-normal text-[14px] -tracking-[.25px] outline-0 rounded-[8px]
                                        hover:border-[#D87D4A] focus:border-[#D87D4A] data-[error=true]:border-[#CD2C2C] data-[error=true]:border-[2px]`}
                {...register("address", { required: true })}
                placeholder={`1137 Williams Avenue`}
              />
            </div>
            <div className={`flex flex-col gap-2`}>
              <label className={`${text.label}`}>ZIP Code</label>
              <input
                data-error={!!errors.zip}
                className={`border px-6 py-4.5 text-normal text-[14px] -tracking-[.25px] outline-0 rounded-[8px]
                                        hover:border-[#D87D4A] focus:border-[#D87D4A] data-[error=true]:border-[#CD2C2C] data-[error=true]:border-[2px]`}
                {...register("zip", { required: true })}
                placeholder={`10001`}
              />
            </div>
            <div className={`flex flex-col gap-2`}>
              <label className={`${text.label}`}>City</label>
              <input
                data-error={!!errors.city}
                className={`border px-6 py-4.5 text-normal text-[14px] -tracking-[.25px] outline-0 rounded-[8px]
                                        hover:border-[#D87D4A] focus:border-[#D87D4A] data-[error=true]:border-[#CD2C2C] data-[error=true]:border-[2px]`}
                {...register("city", { required: true })}
                placeholder={`New York`}
              />
            </div>
            <div className={`flex flex-col gap-2`}>
              <label className={`${text.label}`}>Country</label>
              <input
                data-error={!!errors.country}
                className={`border px-6 py-4.5 text-normal text-[14px] -tracking-[.25px] outline-0 rounded-[8px]
                                        hover:border-[#D87D4A] focus:border-[#D87D4A] data-[error=true]:border-[#CD2C2C] data-[error=true]:border-[2px]`}
                {...register("country", { required: true })}
                placeholder={`United States`}
              />
            </div>
          </fieldset>
          <fieldset
            className={`grid gap-y-4 md:col-span-2 grid-cols-subgrid gap-x-4`}
          >
            <h2
              className={`${text.subtitle} md:col-span-2 uppercase text-[#D87D4A] font-bold leading-[25px] tracking-[.93px]`}
            >
              payment details
            </h2>
            <div className={`grid md:col-span-2 grid-cols-subgrid`}>
              <label className={`${text.label}`}>Payment Method</label>
              <Controller
                control={control}
                name={`payment`}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    value={field.value ?? "cash"}
                    onValueChange={field.onChange}
                    defaultValue="option-one"
                    className={`flex flex-col gap-4`}
                    style={{ "--primary": "#D87D4A" } as CSSProperties}
                  >
                    <div
                      className={`flex items-center space-x-2 border px-5 py-6 rounded-[8px] cursor-pointer
                                            ${field.value === "e-Money" ? "border-[#D87D4A]" : ""} hover:border-[#D87D4A]`}
                    >
                      <RadioGroupItem value="e-Money" id="e-Money" />
                      <label htmlFor="e-Money" className={` cursor-pointer`}>
                        e-Money
                      </label>
                    </div>
                    <div
                      className={`flex items-center space-x-2 border px-5 py-6 rounded-[8px] cursor-pointer
                                            ${field.value === "cash" ? "border-[#D87D4A]" : ""} hover:border-[#D87D4A]`}
                    >
                      <RadioGroupItem value="cash" id="cash" />
                      <label htmlFor="cash" className={` cursor-pointer`}>
                        Cash on Delivery
                      </label>
                    </div>
                  </RadioGroup>
                )}
              />
            </div>
            {(!method || method === "cash" || method === "") && (
              <div className={`col-span-2 flex gap-8`}>
                <img
                  src={`/audiophile/checkout/icon-cash-on-delivery.svg`}
                  className={`w-12`}
                  alt={`cash on delivery`}
                />
                <p
                  className={`text-[15px] leading-[25px] tracking-0 opacity-50`}
                >
                  The ‘Cash on Delivery’ option enables you to pay in cash when
                  our delivery courier arrives at your residence. Just make sure
                  your address is correct so that your order will not be
                  cancelled.
                </p>
              </div>
            )}
            {method === "e-Money" && (
              <>
                <div className={`flex flex-col gap-2`}>
                  <label className={`${text.label}`}>e-Money Number</label>
                  <input
                    data-error={!!errors.emoney}
                    className={`border px-6 py-4.5 text-normal text-[14px] -tracking-[.25px] outline-0 rounded-[8px]
                                        hover:border-[#D87D4A] focus:border-[#D87D4A] data-[error=true]:border-[#CD2C2C] data-[error=true]:border-[2px]`}
                    {...register("emoney", { required: true })}
                    placeholder={`238521993`}
                  />
                </div>
                <div className={`flex flex-col gap-2`}>
                  <label className={`${text.label}`}>e-Money PIN</label>
                  <input
                    data-error={!!errors.pin}
                    className={`border px-6 py-4.5 text-normal text-[14px] -tracking-[.25px] outline-0 rounded-[8px]
                                        hover:border-[#D87D4A] focus:border-[#D87D4A] data-[error=true]:border-[#CD2C2C] data-[error=true]:border-[2px]`}
                    {...register("pin", { required: true })}
                    placeholder={`6891`}
                  />
                </div>
              </>
            )}
          </fieldset>
        </form>
        <Summary type={`summary`}>
          <button
            onClick={handleSubmit(onSubmit)}
            className={`uppercase text-white bg-[#D87D4A] hover:bg-[#FBAF85] py-4`}
          >
            confirm and pay
          </button>
        </Summary>
      </main>
      <Dialog
        open={thankYouOpen}
        onOpenChange={() => {
          setThankYouOpen(false);
          clearCart();
        }}
      >
        <DialogContent className={`grid gap-8 p-12 !w-max !max-w-[100vw]`}>
          <DialogHeader className={`grid gap-6`}>
            <img
              src="/audiophile/checkout/icon-order-confirmation.svg"
              alt="check icon"
              className={`w-[80px] h-[80px]`}
            />
            <DialogTitle
              className={`font-bold text-[32px] leading-[36px] tracking-[1.14px]`}
            >
              THANK YOU
              <br />
              FOR YOUR ORDER
            </DialogTitle>
            <DialogDescription
              className={`opacity-50 text-[15px] leading-[25px]`}
            >
              You will receive an email confirmation shortly.
            </DialogDescription>
          </DialogHeader>
          <div className={`flex rounded-[8px] overflow-hidden w-max`}>
            {firstProduct?.price && (
              <article
                className={`grid grid-cols-[auto_auto_auto] bg-[#F1F1F1] px-6 py-6 gap-x-4`}
              >
                <img
                  src={firstProduct?.image.desktop}
                  alt={firstProduct?.name}
                  className={`w-[50px] h-[50px] row-span-2 my-auto`}
                />
                <h2
                  className={`mr-6 self-end font-bold text-[15px] leading-[25px] tracking-0`}
                >
                  {firstProduct?.name}
                </h2>
                <span
                  className={`font-bold opacity-50 text-[14px] leading-[25px] tracking-0`}
                >
                  x{firstProduct?.quantity}
                </span>
                <span
                  className={`row-start-2 col-start-2 font-bold opacity-50 text-[14px] leading-[25px] tracking-0`}
                >
                  {formatDecimalAsDollars(firstProduct?.price, {
                    hasCommas: true,
                    integerOnly: true,
                  })}
                </span>
                {basketProducts?.length && basketProducts.length > 1 && (
                  <>
                    <hr className={`col-span-3 my-3`} />
                    <span className={`col-span-3 mx-auto`}>
                      and {basketProducts.length - 1} other item(s)
                    </span>
                  </>
                )}
              </article>
            )}
            <article
              className={`bg-black text-white px-8 text-nowrap flex flex-col justify-center gap-2`}
            >
              <span
                className={`text-[15px] leading-[25px] tracking-0 opacity-50 uppercase`}
              >
                Grand Total
              </span>
              <span className={`text-[18px] tracking-0 uppercase`}>
                $ 5,446
              </span>
            </article>
          </div>
          <DialogFooter>
            <Link
              onClick={clearCart}
              href={`/audiophile`}
              className={`bg-[#D87D4A] w-full text-center text-white py-4 rounded-[8px]`}
            >
              BACK TO HOME
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
