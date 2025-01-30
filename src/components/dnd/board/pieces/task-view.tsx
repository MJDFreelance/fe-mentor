import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Checkbox} from "@/components/ui/checkbox";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import React, {useEffect} from "react";
import {Controller, useFieldArray, useForm} from "react-hook-form";

export const TaskView = ({selection, setSelection, columns, onSave, onDelete}:any) => {
    const {handleSubmit, register, control, watch, formState} = useForm({defaultValues: {...selection?.item}});
    const subtaskArray = useFieldArray({control, name: `subtasks`});

    const subtasks = watch(`subtasks`);
    const allFields = watch();
    const status = watch(`status`);

    useEffect(() => {
        onSave(allFields);
    }, [subtasks?.filter(t=>t.isCompleted).length, status]);

    const deleteCard = () => {
        console.log(`deleteCard`, selection.item);
        onDelete(selection.item);
        setSelection(null);
    }

    return (
        <Dialog open={selection?.mode===`view`} onOpenChange={()=>setSelection(null)}>
            <DialogContent className={`w-full`}>
                <DialogTitle className={`flex items-center justify-between w-full font-bold text-[18px] max-w-[35ch]`}>
                    {selection?.item?.title}
                </DialogTitle>
                <DropdownMenu>
                    <DropdownMenuTrigger className={`absolute top-6 right-6`}>Open</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem><button onClick={()=>setSelection(prev=>({...prev, mode:'edit'}))}>Edit Task</button></DropdownMenuItem>
                        <DropdownMenuItem><button onClick={()=>deleteCard()}>Delete Task</button></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className={`text-[13px] leading-[23px] text-[#828FA3]`}>{selection?.item?.description}</div>
                <div>Subtasks ({selection?.item?.subtasks?.filter(t=>t.isCompleted).length} of {selection?.item?.subtasks?.length})</div>
                <div className={`flex flex-col gap-2`}>
                    {subtaskArray.fields?.map((subtask, index) => (
                        <div className={`flex items-center gap-7 bg-[#F4F7FD] p-3 rounded-[4px]`} key={subtask.title}>
                            <Controller control={control} name={`subtasks.${index}.isCompleted`} render={({field, fieldState})=>(
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            )} />
                            {subtask.title}
                        </div>
                    ))}
                </div>
                <div>Current Status</div>
                <Controller control={control} name={`status`} render={({field, fieldState})=>(
                    <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            {columns.map((column) => (
                                <SelectItem key={column.columnId} value={column.columnId}>
                                    {column.title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}>
                </Controller>
            </DialogContent>
        </Dialog>
    );
};