"use client";

import { CSSProperties, useEffect, useMemo, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import Markdown from "react-markdown";
import initialData from "@/app/markdown/data.json";
import CloseIcon from "@/app/markdown/icons/icon-close.svg";
import DarkIcon from "@/app/markdown/icons/icon-dark-mode.svg";
import DeleteIcon from "@/app/markdown/icons/icon-delete.svg";
import DocIcon from "@/app/markdown/icons/icon-document.svg";
import HidePreviewIcon from "@/app/markdown/icons/icon-hide-preview.svg";
import LightIcon from "@/app/markdown/icons/icon-light-mode.svg";
import MenuIcon from "@/app/markdown/icons/icon-menu.svg";
import SaveIcon from "@/app/markdown/icons/icon-save.svg";
import PreviewIcon from "@/app/markdown/icons/icon-show-preview.svg";
import Logo from "@/app/markdown/icons/logo.svg";
import { DialogTrigger } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Page = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [data, setData] = useState(initialData);
  const [current, setCurrent] = useState(data[0].id);
  const [previewOnly, setPreviewOnly] = useState(false);
  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { isDirty },
  } = useForm({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const currentDoc = useMemo(
    () => data.find((doc) => doc.id === current),
    [current],
  );
  useEffect(() => {
    reset(currentDoc);
  }, [currentDoc, data]);

  useEffect(() => {
    console.log(isDirty);
  }, [isDirty]);

  const content = watch("content");

  const onSubmit = (data: any) => {
    setData((prev) => prev.map((item) => (data.id === item.id ? data : item)));
  };

  const deleteItem = (id: string) => {
    setData((prev) => {
      const items = prev.filter((item) => item.id !== id);
      setCurrent(items[0].id);
      return prev.filter((item) => item.id !== id);
    });
  };

  const handleDocClick = (id: string) => {
    if (isDirty) return alert("Please save first");
    setCurrent(id);
  };

  return (
    <div
      data-show-menu={menuOpen}
      data-preview-only={previewOnly}
      data-dark-mode={isDarkMode}
      className={`grid group grid-cols-[auto_auto_auto] box-border h-screen grid-rows-[auto_1fr] overflow-hidden`}
    >
      <div
        className={`grid grid-rows-subgrid row-span-2 max-h-[50vh] 
                    max-w-0 group-data-[show-menu=false]:max-w-[300px] transition-[max-width] duration-1000`}
      >
        <div
          className={`flex items-center h-full n bg-[#1D1F22] text-white px-6 uppercase`}
        >
          <Logo />
        </div>
        <aside className={`flex flex-col gap-6 w-full bg-[#1D1F22] px-6`}>
          <div className={`text-[#7C8187] uppercase`}>My Documents</div>
          <button
            className={`ml-auto bg-[#E46643] rounded-[4px] text-white text-nowrap py-2.5 px-11 hover:bg-[#F39765]`}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            + New Document
          </button>
          <menu className={`flex flex-col gap-6 text-white`}>
            {data.map((doc) => (
              <button
                className={`group flex flex-col items-start justify-start`}
                key={doc.id}
                onClick={() => handleDocClick(doc.id)}
              >
                <div className={`grid grid-cols-[auto_auto] gap-x-4 text-left`}>
                  <DocIcon className={`row-span-2 self-center`} />
                  <div className={`text-[#7C8187] max-md:hidden`}>
                    {doc.createdAt}
                  </div>
                  <div className={`hover:text-[#F39765]`}>{doc.name}</div>
                </div>
              </button>
            ))}
          </menu>
          <div
            className={"flex gap-3 mb-8 mt-auto"}
            style={
              {
                "--primary": "216, 8%, 38%",
                "--input": "216, 8%, 38%",
              } as CSSProperties
            }
          >
            <LightIcon />
            <Switch onCheckedChange={setIsDarkMode} checked={isDarkMode} />
            <DarkIcon />
          </div>
        </aside>
      </div>
      <header
        className={`flex gap-6 bg-[#2B2D31] col-span-2 items-center text-white max-w-[100vw]`}
      >
        <button
          className={`flex items-center justify-center h-full hover:bg-[#E46643] bg-[#35393F]  aspect-square`}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <MenuIcon /> : <CloseIcon />}
        </button>
        <span className={`uppercase max-md:hidden`}>
          <Logo />
        </span>
        <hr
          className={`h-full bg-[#5A6069] w-[1px] my-4 uppercase max-md:hidden`}
        />
        <div className={`grid grid-cols-[auto_auto] my-4 gap-x-3 md:gap-x-4`}>
          <DocIcon className={`row-span-2 self-center`} />
          <div className={`text-[#7C8187] max-md:hidden`}>Document Name</div>
          <input
            {...register("name")}
            className={`bg-transparent outline-0 focus:border-b max-md:max-w-32 max-md:w-32`}
          />
        </div>
        <div className={`flex items-center ml-auto`}>
          <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
            <DialogTrigger className={`py-2.5 px-4 rounded-[4px] mr-4`}>
              <DeleteIcon className={`hover:stroke-[#E46643]`} />
            </DialogTrigger>
            <DialogContent className={`flex flex-col gap-4 !w-fit`}>
              <DialogHeader className={`grid gap-4 font-[RobotoSlab]`}>
                <DialogTitle
                  className={`font-bold text-[1.25rem] leading-[1.25rem]`}
                >
                  Delete this document?
                </DialogTitle>
                <DialogDescription
                  className={`text-[.8725rem] leading-[1.5rem] max-w-[37ch]`}
                >
                  Are you sure you want to delete the ‘welcome.md’ document and
                  its contents? This action cannot be reversed.
                </DialogDescription>
              </DialogHeader>
              <button
                className={`bg-[#E46643] text-white py-2.5 rounded-[8px] hover:bg-[#F39765]`}
                onClick={() => {
                  deleteItem(currentDoc?.id ?? "-2");
                  setShowDeleteModal(false);
                }}
              >
                Confirm & Delete
              </button>
            </DialogContent>
          </Dialog>
          <button
            className={`flex items-center gap-2  py-2.5 px-4 bg-[#E46643] rounded-[4px] mr-4 hover:bg-[#F39765]`}
            disabled={!isDirty}
            onClick={handleSubmit(onSubmit)}
          >
            <SaveIcon />
            <span className={`max-md:hidden `}>Save Changes</span>
          </button>
        </div>
      </header>
      <div
        className={`relative grid col-span-2 grid-cols-subgrid grid-rows-subgrid`}
      >
        <form
          className={`grid bg-[#F5F5F5] grid-rows-[auto_1fr] h-full overflow-hidden w-[100vw] md:w-[50vw] group-data-[preview-only=true]:hidden`}
        >
          <header
            className={`flex justify-between h-fit px-4 py-3 border-r 
                            group-data-[dark-mode=true]:bg-[#1D1F22] group-data-[dark-mode=true]:text-[#C1C4CB]`}
          >
            <span className={`uppercase`}>markdown</span>
            <button
              type={`button`}
              onClick={() => setPreviewOnly((prev) => !prev)}
              className={`md:group-data-[preview-only=false]:hidden`}
            >
              {previewOnly ? (
                <HidePreviewIcon
                  className={`fill-[#7C8187] hover:fill-[#E46643]`}
                />
              ) : (
                <PreviewIcon
                  className={`fill-[#7C8187] hover:fill-[#E46643]`}
                />
              )}
            </button>
          </header>
          <textarea
            {...register("content")}
            className={`bg-white group-data-[dark-mode=true]:bg-black group-data-[dark-mode=true]:text-white border-r p-4 h-full overflow-auto outline-0`}
          ></textarea>
        </form>
        <div
          style={{ "--tw-prose-headings": "white" } as CSSProperties}
          className={`relative grid bg-[#F5F5F5] grid-rows-[auto_1fr] h-full overflow-hidden w-[50vw] group-data-[preview-only=true]:w-[100vw]
                    `}
        >
          <header
            className={`flex justify-between h-fit px-4 py-3 border-r group-data-[dark-mode=true]:bg-[#1D1F22] group-data-[dark-mode=true]:text-[#C1C4CB]`}
          >
            PREVIEW
            <button
              onClick={() => setPreviewOnly((prev) => !prev)}
              className={``}
            >
              {previewOnly ? (
                <HidePreviewIcon
                  className={`fill-[#7C8187] hover:fill-[#E46643]`}
                />
              ) : (
                <PreviewIcon
                  className={`fill-[#7C8187] hover:fill-[#E46643]`}
                />
              )}
            </button>
          </header>
          <Markdown
            className={`bg-white border-r p-4 h-full overflow-auto prose !max-w-full group-data-[dark-mode=true]:bg-black group-data-[dark-mode=true]:text-white`}
          >
            {content}
          </Markdown>
        </div>
      </div>
    </div>
  );
};

export default Page;
