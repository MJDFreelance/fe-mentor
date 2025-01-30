import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog";
import React from "react";
import {useForm} from "react-hook-form";

export const MoveNew = ({selection, setSelection, onSaved}:any) => {
    const {handleSubmit, register} = useForm();

    const onSubmit = (data:any) => {
        onSaved(data);
        setSelection(null);
    };

    return (
        <Dialog open={selection?.mode===`move-new`} onOpenChange={()=>setSelection(null)}>
            <DialogContent className={`w-full`}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle
                        className={`flex items-center justify-between w-full font-bold text-[18px] max-w-[35ch]`}>
                        New Column
                    </DialogTitle>
                    <input {...register(`name`)}
                           className={`w-full border flex items-center gap-7 p-3 rounded-[4px]`} />
                    <button>Add Column</button>
                </form>
            </DialogContent>
        </Dialog>
    );
};