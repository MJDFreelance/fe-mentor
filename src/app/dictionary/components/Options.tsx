"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useSettings } from "@/components/context/SettingsContext";
import { CSSProperties } from "react";
import text from "@/app/dictionary/text.module.css";

export const Options = () => {
  const { setColorMode, setFont, colorMode } = useSettings();

  return (
    <span className={`flex items-center gap-7`}>
      <Select onValueChange={(value) => setFont(value)}>
        <SelectTrigger
          className={`${text.select} w-[180px] border-0 outline-0 text-[#2D2D2D] group-data-[color-mode=dark]:text-white`}
        >
          <SelectValue placeholder="Sans Serif" className={``} />
        </SelectTrigger>
        <SelectContent
          data-color-mode={colorMode}
          className={`group data-[color-mode=dark]:bg-[#1F1F1F] 
                            !border-0 rounded-[16px] p-6 flex flex-col-gap-4 data-[color-mode=dark]:shadow-[0_5px_30px_0px_#A445ED] shadow-[0_5px_30px_0px_rgba(0,0,0,.2)] mt-4`}
        >
          <SelectItem
            value="sans"
            className={`font-[Inter] font-bold text-[#2D2D2D] 
                            !cursor-pointer ${text.select} !bg-transparent
                            group-data-[color-mode=dark]:text-white group-data-[color-mode=dark]:hover:text-[#A445ED] group-data-[color-mode=light]:hover:text-[#A445ED]`}
          >
            Sans Serif
          </SelectItem>
          <SelectItem
            value="serif"
            className={`font-[Lora] hover:text-[#A445ED] text-[#2D2D2D] 
                            font-bold !cursor-pointer ${text.select} !bg-transparent
                            group-data-[color-mode=dark]:text-white group-data-[color-mode=dark]:hover:text-[#A445ED] group-data-[color-mode=light]:hover:text-[#A445ED]`}
          >
            Serif
          </SelectItem>
          <SelectItem
            value="mono"
            className={`font-[Inconsolata] hover:text-[#A445ED] text-[#2D2D2D] 
                            font-bold !cursor-pointer ${text.select} !bg-transparent
                            group-data-[color-mode=dark]:text-white group-data-[color-mode=dark]:hover:text-[#A445ED] group-data-[color-mode=light]:hover:text-[#A445ED]`}
          >
            Mono
          </SelectItem>
        </SelectContent>
      </Select>
      <hr className={`w-[1px] h-full bg-[#E9E9E9]`} />
      <Switch
        style={{ "--primary": "274,82%,60%" } as CSSProperties}
        onCheckedChange={(value) => setColorMode(value ? "dark" : "light")}
      />
    </span>
  );
};
