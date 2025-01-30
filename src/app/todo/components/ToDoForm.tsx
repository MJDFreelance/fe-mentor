"use client";

import { Checkbox } from "@/components/ui/checkbox";
import text from "@/app/todo/text.module.css";
import { useForm, Controller } from "react-hook-form";
import { ToDo, useToDo } from "@/app/todo/components/TodoContext";
import { v4 as uuid } from "uuid";

const scene = text;

export const ToDoForm = () => {
  const { register, control, handleSubmit, reset } = useForm<ToDo>();
  const { setToDos } = useToDo();

  const onSubmit = (values: ToDo) => {
    setToDos((prev) => [...prev, { ...values, id: uuid() }]);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${scene.form} ${text.preset2} flex items-center gap-3 rounded-[5px] bg-background px-6 py-4 md:gap-6`}
    >
      <Controller
        control={control}
        name="completed"
        render={({ field }) => (
          <Checkbox
            className={`rounded-full`}
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        )}
      />
      <input
        {...register("name")}
        type="text"
        className={`w-full bg-background px-2 py-1 text-foreground outline-0`}
        placeholder={`Create a new todo`}
      />
    </form>
  );
};
