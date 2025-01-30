import {Controller, useFieldArray, useForm} from "react-hook-form";
import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import React from "react";
import crypto from "crypto";

export const BoardAdd = ({selection, setSelection, onSaved}:any) => {
    const {handleSubmit, register, control, formState} = useForm({defaultValues: {...selection?.item, id: `1`}});
    const columnsArray = useFieldArray({control, name: `columns`});

    const onSubmit = (data:any) => {
        onSaved(data);
        console.log('new board', data);
        setSelection(null);
    };

    return (
        <Dialog open={selection?.mode===`add`} onOpenChange={()=>setSelection(null)}>
            <DialogContent className={`w-full`}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle
                        className={`flex items-center justify-between w-full font-bold text-[18px] max-w-[35ch]`}>
                        Add New Board
                    </DialogTitle>
                    <input {...register(`name`)} />
                    {columnsArray.fields?.map((column, index) => (
                        <div className={`flex items-center w-full`} key={`column-${index}`}>
                            <input {...register(`columns.${index}.name`)} />
                            <button type={`button`} onClick={() => columnsArray.remove(index)}>X</button>
                        </div>
                    ))}
                    <button type={`button`} onClick={() => columnsArray.append({title: ``, items: []})}>Add Column
                    </button>
                    <button type={`submit`} >Save Board </button>
                </form>
            </DialogContent>
        </Dialog>
    );
};