"use client";

import { useSheet } from "@/app/invoices/components/Sheet";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { Fragment, useCallback, useEffect } from "react";
import { useInvoice } from "@/app/invoices/components/InvoiceContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import CalendarIcon from "@/app/invoices/icons/icon-calendar.svg";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateTime } from "luxon";
import IconDelete from "@/app/invoices/icons/icon-delete.svg";

export const Form = () => {
  const { setPaperOpen } = useSheet();
  const { viewMode, changeView, updateInvoice, createInvoice } = useInvoice();
  const { register, handleSubmit, control, reset, watch } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  const items = watch("items");

  const calculateTotal = useCallback(
    (index: number) => {
      if (items) {
        const item = items[index];
        if (item?.quantity && item?.price) {
          return (item.quantity * item.price).toFixed(2);
        }
      }
      return 0;
    },
    [items],
  );

  useEffect(() => {
    if (viewMode?.invoice) {
      reset(viewMode.invoice);
    } else reset();
  }, [viewMode]);

  const onSubmit = (data: any, event: any) => {
    const clickedButton = event.nativeEvent.submitter; // The button that triggered the submit
    const total =
      items?.reduce(
        (acc: number, item: { quantity: number; price: number }) =>
          acc + item.quantity * item.price,
        0,
      ) ?? 0;
    const createdAtDate = DateTime.fromJSDate(data.createdAt);
    data.createdAt = createdAtDate.toFormat("yyyy-MM-dd");
    data.paymentDue = createdAtDate
      .plus({ days: parseInt(data.paymentTerms) })
      .toFormat("yyyy-MM-dd");
    if (data.id) {
      updateInvoice(data);
    } else {
      createInvoice({ ...data, status: clickedButton.name, total });
      console.log(data);
    }
    changeView(undefined);
  };

  return (
    <div
      className={`group-data-[color-mode=dark]:bg-[#141625] group-data-[color-mode=dark]:text-white relative box-border w-full  pb-2 h-[calc(100vh-72px)] md:h-[calc(100vh-80px)] xl:h-screen max-w-full overflow-y-auto overflow-x-hidden `}
    >
      <header
        className={`px-6 sticky top-0 w-[calc(100vw-48px)] z-30 pt-2 bg-white group-data-[color-mode=dark]:bg-[#141625]`}
      >
        <button
          className={`my-6 `}
          onClick={() => setPaperOpen((prev: boolean) => !prev)}
        >
          Go back
        </button>
        <h2
          className={`group-data-[color-mode=dark]:text-white text-[#0C0E16] font-bold text-[24px] leading-[32px] -tracking-[.5px] mb-6`}
        >
          New Invoice
        </h2>
      </header>
      <form
        className={`grid gap-10 auto-rows-min overflow-auto sticky top-0`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset className={`px-6 grid grid-cols-2 md:grid-cols-6 gap-6`}>
          <h3
            className={`text-[#7C5DFA] font-bold text-[15px] leading-[1] -tracking-[.25px] col-span-2 md:col-span-6`}
          >
            Bill From
          </h3>
          <div
            className={`grid grid-rows-subgrid gap-2 col-span-2 md:col-span-6 row-span-3`}
          >
            <label
              className={`text-[#7E88C3] group-data-[color-mode=dark]:text-[#DFE3FA] text-[13px] leading-[15px] -tracking-[.1px]`}
            >
              Street Address
            </label>
            <input
              {...register(`senderAddress.street`, {
                required: true,
                maxLength: 20,
              })}
              className={`border w-full px-5 py-4.5 font-bold text-[15px] leading-[15px] -tracking-[.25px] rounded-[4px]
                            group-data-[color-mode=dark]:text-white group-data-[color-mode=dark]:bg-[#1E2139] group-data-[color-mode=dark]:border-0 outline-0`}
            />
          </div>
          <div
            className={`grid grid-rows-subgrid gap-2 col-span-1 md:col-span-2 row-span-3`}
          >
            <label
              className={`text-[#7E88C3] group-data-[color-mode=dark]:text-[#DFE3FA] text-[13px] leading-[15px] -tracking-[.1px]`}
            >
              City
            </label>
            <input
              {...register(`senderAddress.city`, {
                required: true,
                maxLength: 20,
              })}
              className={`border w-full px-5 py-4.5 font-bold text-[15px] leading-[15px] -tracking-[.25px] rounded-[4px]
                            group-data-[color-mode=dark]:text-white group-data-[color-mode=dark]:bg-[#1E2139] group-data-[color-mode=dark]:border-0 outline-0`}
            />
          </div>
          <div
            className={`grid grid-rows-subgrid gap-2 col-span-1 md:col-span-2 row-span-3`}
          >
            <label
              className={`text-[#7E88C3] group-data-[color-mode=dark]:text-[#DFE3FA] text-[13px] leading-[15px] -tracking-[.1px]`}
            >
              Post Code
            </label>
            <input
              {...register(`senderAddress.postCode`, {
                required: true,
                maxLength: 20,
              })}
              className={`border w-full px-5 py-4.5 font-bold text-[15px] leading-[15px] -tracking-[.25px] rounded-[4px]
                            group-data-[color-mode=dark]:text-white group-data-[color-mode=dark]:bg-[#1E2139] group-data-[color-mode=dark]:border-0 outline-0`}
            />
          </div>
          <div className={`grid grid-rows-subgrid gap-2 col-span-2 row-span-3`}>
            <label
              className={`text-[#7E88C3] group-data-[color-mode=dark]:text-[#DFE3FA] text-[13px] leading-[15px] -tracking-[.1px]`}
            >
              Country
            </label>
            <input
              {...register(`senderAddress.country`, {
                required: true,
                maxLength: 20,
              })}
              className={`border w-full px-5 py-4.5 font-bold text-[15px] leading-[15px] -tracking-[.25px] rounded-[4px]
                            group-data-[color-mode=dark]:text-white group-data-[color-mode=dark]:bg-[#1E2139] group-data-[color-mode=dark]:border-0 outline-0`}
            />
          </div>
        </fieldset>
        <fieldset className={`px-6 grid grid-cols-2 md:grid-cols-6 gap-6`}>
          <h3
            className={`text-[#7C5DFA] font-bold text-[15px] leading-[1] -tracking-[.25px] col-span-2 md:col-span-6`}
          >
            Bill To
          </h3>
          <div
            className={`grid grid-rows-subgrid gap-2 col-span-2 md:col-span-6 row-span-3`}
          >
            <label
              className={`text-[#7E88C3] group-data-[color-mode=dark]:text-[#DFE3FA] text-[13px] leading-[15px] -tracking-[.1px]`}
            >
              Client’s Name
            </label>
            <input
              {...register(`clientName`, { required: true, maxLength: 20 })}
              className={`border w-full px-5 py-4.5 font-bold text-[15px] leading-[15px] -tracking-[.25px] rounded-[4px]
                            group-data-[color-mode=dark]:text-white group-data-[color-mode=dark]:bg-[#1E2139] group-data-[color-mode=dark]:border-0 outline-0`}
            />
          </div>
          <div
            className={`grid grid-rows-subgrid gap-2 col-span-2 md:col-span-6 row-span-3`}
          >
            <label
              className={`text-[#7E88C3] group-data-[color-mode=dark]:text-[#DFE3FA] text-[13px] leading-[15px] -tracking-[.1px]`}
            >
              Client’s Email
            </label>
            <input
              {...register(`clientEmail`, { required: true, maxLength: 20 })}
              className={`border w-full px-5 py-4.5 font-bold text-[15px] leading-[15px] -tracking-[.25px] rounded-[4px]
                            group-data-[color-mode=dark]:text-white group-data-[color-mode=dark]:bg-[#1E2139] group-data-[color-mode=dark]:border-0 outline-0`}
            />
          </div>
          <div
            className={`grid grid-rows-subgrid gap-2 col-span-2 md:col-span-6 row-span-3`}
          >
            <label
              className={`text-[#7E88C3] group-data-[color-mode=dark]:text-[#DFE3FA] text-[13px] leading-[15px] -tracking-[.1px]`}
            >
              Street Address
            </label>
            <input
              {...register(`clientAddress.street`, {
                required: true,
                maxLength: 20,
              })}
              className={`border w-full px-5 py-4.5 font-bold text-[15px] leading-[15px] -tracking-[.25px] rounded-[4px]
                            group-data-[color-mode=dark]:text-white group-data-[color-mode=dark]:bg-[#1E2139] group-data-[color-mode=dark]:border-0 outline-0`}
            />
          </div>
          <div
            className={`grid grid-rows-subgrid gap-2 md:col-span-2 row-span-3`}
          >
            <label
              className={`text-[#7E88C3] group-data-[color-mode=dark]:text-[#DFE3FA] text-[13px] leading-[15px] -tracking-[.1px]`}
            >
              City
            </label>
            <input
              {...register(`clientAddress.city`, {
                required: true,
                maxLength: 20,
              })}
              className={`border w-full px-5 py-4.5 font-bold text-[15px] leading-[15px] -tracking-[.25px] rounded-[4px]
                            group-data-[color-mode=dark]:text-white group-data-[color-mode=dark]:bg-[#1E2139] group-data-[color-mode=dark]:border-0 outline-0`}
            />
          </div>
          <div
            className={`grid grid-rows-subgrid gap-2 md:col-span-2 row-span-3`}
          >
            <label
              className={`text-[#7E88C3] group-data-[color-mode=dark]:text-[#DFE3FA] text-[13px] leading-[15px] -tracking-[.1px]`}
            >
              Post Code
            </label>
            <input
              {...register(`clientAddress.postCode`, {
                required: true,
                maxLength: 20,
              })}
              className={`border w-full px-5 py-4.5 font-bold text-[15px] leading-[15px] -tracking-[.25px] rounded-[4px]
                            group-data-[color-mode=dark]:text-white group-data-[color-mode=dark]:bg-[#1E2139] group-data-[color-mode=dark]:border-0 outline-0`}
            />
          </div>
          <div className={`grid grid-rows-subgrid gap-2 col-span-2 row-span-3`}>
            <label
              className={`text-[#7E88C3] group-data-[color-mode=dark]:text-[#DFE3FA] text-[13px] leading-[15px] -tracking-[.1px]`}
            >
              Country
            </label>
            <input
              {...register(`clientAddress.country`, {
                required: true,
                maxLength: 20,
              })}
              className={`border w-full px-5 py-4.5 font-bold text-[15px] leading-[15px] -tracking-[.25px] rounded-[4px]
                            group-data-[color-mode=dark]:text-white group-data-[color-mode=dark]:bg-[#1E2139] group-data-[color-mode=dark]:border-0 outline-0`}
            />
          </div>
        </fieldset>
        <fieldset className={`px-6 grid grid-cols-2 md:grid-cols-6 gap-6`}>
          <div
            className={`grid grid-rows-subgrid gap-2 col-span-2 md:col-span-3 row-span-3`}
          >
            <label
              className={`text-[#7E88C3] group-data-[color-mode=dark]:text-[#DFE3FA] text-[13px] leading-[15px] -tracking-[.1px]`}
            >
              Invoice Date
            </label>
            <Controller
              control={control}
              name="createdAt"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`flex justify-between border w-full px-5 py-6 font-bold text-[15px] leading-[15px] -tracking-[.25px] rounded-[4px]
                            group-data-[color-mode=dark]:text-white group-data-[color-mode=dark]:bg-[#1E2139] group-data-[color-mode=dark]:border-0 outline-0`}
                    >
                      {field.value ? (
                        DateTime.fromFormat(field.value, "yyyy-MM-dd").toFormat(
                          "dd MMM yyyy",
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="mr-2 h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-[#141625]">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(value) => field.onChange(value)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
          </div>
          <div
            className={`grid grid-rows-subgrid gap-2 col-span-2 md:col-span-3 row-span-3`}
          >
            <label
              className={`text-[#7E88C3] group-data-[color-mode=dark]:text-[#DFE3FA] text-[13px] leading-[15px] -tracking-[.1px]`}
            >
              Payment Terms
            </label>
            <Controller
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    className="py-6 border w-full px-5 font-bold text-[15px] leading-[15px] -tracking-[.25px] rounded-[4px]
                            group-data-[color-mode=dark]:text-white group-data-[color-mode=dark]:bg-[#1E2139] group-data-[color-mode=dark]:border-0 outline-0"
                  >
                    <SelectValue placeholder="Payment Terms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Next 1 Day</SelectItem>
                    <SelectItem value="7">Next 7 Days</SelectItem>
                    <SelectItem value="14">Next 14 Days</SelectItem>
                    <SelectItem value="30">Next 30 Days</SelectItem>
                  </SelectContent>
                </Select>
              )}
              name={`paymentTerms`}
              control={control}
              defaultValue={""}
            />
          </div>
          <div
            className={`grid grid-rows-subgrid gap-2 col-span-2 md:col-span-6 row-span-3`}
          >
            <label
              className={`text-[#7E88C3] group-data-[color-mode=dark]:text-[#DFE3FA] text-[13px] leading-[15px] -tracking-[.1px]`}
            >
              Project Description
            </label>
            <input
              {...register(`description`, { required: true, maxLength: 20 })}
              className={`border w-full px-5 py-4.5 font-bold text-[15px] leading-[15px] -tracking-[.25px] rounded-[4px]
                            group-data-[color-mode=dark]:text-white group-data-[color-mode=dark]:bg-[#1E2139] group-data-[color-mode=dark]:border-0 outline-0 `}
            />
          </div>
        </fieldset>
        <fieldset
          className={`px-6 grid grid-cols-2 md:grid-cols-6 gap-6 mb-36`}
        >
          {fields.map((field, index) => (
            <Fragment key={`item-${index}`}>
              <div
                className={`grid grid-rows-subgrid gap-2 col-span-2 md:col-span-6 row-span-3`}
              >
                <label
                  className={`text-[#7E88C3] group-data-[color-mode=dark]:text-[#DFE3FA] text-[13px] leading-[15px] -tracking-[.1px]`}
                >
                  Item Name
                </label>
                <input
                  {...register(`items.${index}.name`, {
                    required: true,
                    maxLength: 20,
                  })}
                  className={`border w-full px-5 py-4.5 font-bold text-[15px] leading-[15px] -tracking-[.25px] rounded-[4px]
                                    group-data-[color-mode=dark]:text-white group-data-[color-mode=dark]:bg-[#1E2139] group-data-[color-mode=dark]:border-0 outline-0`}
                />
              </div>
              <div
                className={`grid grid-cols-[auto_auto_auto_auto] w-full col-span-2 md:col-span-6 gap-4`}
              >
                <div className={`grid grid-rows-subgrid gap-2 row-span-3`}>
                  <label
                    className={`text-[#7E88C3] group-data-[color-mode=dark]:text-[#DFE3FA] text-[13px] leading-[15px] -tracking-[.1px]`}
                  >
                    Qty.
                  </label>
                  <input
                    type={`number`}
                    {...register(`items.${index}.quantity`, {
                      required: true,
                      maxLength: 20,
                    })}
                    className={`border w-full px-5 py-4.5 font-bold text-[15px] leading-[15px] -tracking-[.25px] rounded-[4px]
                                        group-data-[color-mode=dark]:text-white group-data-[color-mode=dark]:bg-[#1E2139] group-data-[color-mode=dark]:border-0 outline-0`}
                  />
                </div>
                <div className={`grid grid-rows-subgrid gap-2 row-span-3`}>
                  <label
                    className={`text-[#7E88C3] group-data-[color-mode=dark]:text-[#DFE3FA] text-[13px] leading-[15px] -tracking-[.1px]`}
                  >
                    Price
                  </label>
                  <input
                    type={`number`}
                    {...register(`items.${index}.price`, {
                      required: true,
                      maxLength: 20,
                    })}
                    className={`border w-full px-5 py-4.5 font-bold text-[15px] leading-[15px] -tracking-[.25px] rounded-[4px]
                                        group-data-[color-mode=dark]:text-white group-data-[color-mode=dark]:bg-[#1E2139] group-data-[color-mode=dark]:border-0 outline-0`}
                  />
                </div>
                <div className={`grid grid-rows-subgrid gap-2 row-span-3`}>
                  <label
                    className={`text-[#7E88C3] group-data-[color-mode=dark]:text-[#DFE3FA] text-[13px] leading-[15px] -tracking-[.1px]`}
                  >
                    Total
                  </label>
                  <input
                    readOnly={true}
                    value={calculateTotal(index)}
                    className={`border w-full px-5 py-4.5 font-bold text-[15px] leading-[15px] -tracking-[.25px] rounded-[4px]
                                        group-data-[color-mode=dark]:text-white group-data-[color-mode=dark]:bg-[#1E2139] group-data-[color-mode=dark]:border-0 outline-0`}
                  />
                </div>
                <button
                  className={`row-span-3 items-center`}
                  onClick={() => remove(index)}
                >
                  <IconDelete />
                </button>
              </div>
            </Fragment>
          ))}
          <button
            className={`mt-6 col-span-2 md:col-span-6`}
            onClick={() => {
              append({ name: "", quantity: "", price: "" });
            }}
          >
            + Add New Item
          </button>
        </fieldset>
        <div
          className={` bottom-0 fixed  w-full font-bold text-[15px] leading-[15px] -tracking-[.25px] -translate-x-5`}
        >
          <div
            className={`h-16 w-full bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,.1)]`}
          ></div>
          <div
            className={`group-data-[color-mode=dark]:bg-[#141625] px-6 flex gap-2 py-6 bg-white`}
          >
            <button
              type={`button`}
              onClick={() => changeView(undefined)}
              className={`py-4.5 rounded-full bg-[#F9FAFE] text-[#7E88C3] flex-1`}
            >
              Discard
            </button>
            <button
              name={`draft`}
              className={`py-4.5 bg-[#373B53] text-[#888EB0] rounded-full flex-1`}
            >
              Save as Draft
            </button>
            <button
              name={`pending`}
              className={`py-4.5 text-white rounded-full bg-[#7C5DFA] flex-1`}
            >
              Save & Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
