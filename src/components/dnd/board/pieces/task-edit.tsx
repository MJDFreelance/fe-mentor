import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import React from "react";
import {Controller, useFieldArray, useForm} from "react-hook-form";

export const TaskEdit = ({selection, setSelection, columns, onSaved}:any) => {
    const {handleSubmit, register, control, formState} = useForm({defaultValues: selection?.item});
    const subtaskArray = useFieldArray({control, name: `subtasks`});

    const onSubmit = (data:any) => {
        onSaved(data);
        setSelection(null);
    };

    return (
        <Dialog open={selection?.mode===`edit`} onOpenChange={()=>setSelection(null)}>
            <DialogContent className={`w-full`}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle
                        className={`flex items-center justify-between w-full font-bold text-[18px] max-w-[35ch]`}>
                        Edit Task
                    </DialogTitle>
                    <div className={`w-full`}>
                        <input {...register(`title`)}
                               className={`w-full border flex items-center gap-7 p-3 rounded-[4px]`}
                               key={selection?.item?.title}/>
                    </div>
                    <div className={`w-full`}>
                        <textarea {...register(`description`)}
                               className={`w-full border flex items-center gap-7 p-3 rounded-[4px] h-fit`}
                               key={selection?.item?.description}/>
                    </div>
                    <div>Subtasks
                        ({selection?.item?.subtasks?.filter(t => t.isCompleted).length} of {selection?.item?.subtasks?.length})
                    </div>
                    <div className={`flex flex-col gap-2`}>
                        {subtaskArray.fields?.map((subtask, index) => (
                            <div className={`flex items-center w-full`} key={`subtask-${index}`}>
                                <input {...register(`subtasks.${index}.title`)}
                                       className={`border flex flex-1 items-center gap-7 p-3 rounded-[4px]`}
                                       key={subtask.title}/>
                                <button type={`button`} onClick={()=>subtaskArray.remove(index)}>X</button>
                            </div>
                        ))}
                        <button type={`button`} onClick={()=>subtaskArray.append({title: ``, isCompleted:false})}>Add Subtask</button>
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
                    <button>Save Changes</button>
                </form>
            </DialogContent>
        </Dialog>
    );
};