"use client";

import { Checkbox } from "@/components/ui/checkbox";
import text from "@/app/todo/text.module.css";
import { ToDo, useToDo } from "@/app/todo/components/TodoContext";

const scene = text;

export const ToDoList = () => {
  const { filteredToDos } = useToDo();

  return (
    <div
      className={`${scene.todolist} ${text.preset2} grid overflow-hidden rounded-[5px]`}
    >
      <ul>
        {filteredToDos.map((toDo) => (
          <ToDoItem key={toDo.id} toDo={toDo} />
        ))}
      </ul>
      <ToDoFooter />
    </div>
  );
};

export const ToDoItem = ({ toDo }: { toDo: ToDo }) => {
  const { setItemCompleted } = useToDo();

  return (
    <li data-completed={true} className={`border-b`}>
      <div
        className={`data-[completed=true]:strikethrough flex items-center gap-3 bg-background px-6 py-4 data-[completed=true]:text-muted md:gap-6`}
      >
        <Checkbox
          className={`rounded-full`}
          onCheckedChange={(checked) => setItemCompleted?.(toDo.id, !!checked)}
          checked={toDo.completed}
        />
        {toDo.name}
      </div>
    </li>
  );
};

export const ToDoFooter = ({ className }: { className?: string }) => {
  const { filteredToDos } = useToDo();

  return (
    <footer
      className={`${scene.listfooter} ${text.preset3} ${className} grid grid-cols-2 items-center bg-background px-6 py-4 text-foreground md:grid-cols-[1fr_auto_1fr]`}
    >
      <div>{filteredToDos.length} items left</div>
      <ToDoCategories className={`hidden md:flex`} />
      <div className={`justify-self-end`}>Clear complete</div>
    </footer>
  );
};

export const ToDoCategories = ({ className }: { className?: string }) => {
  const { filterStatus, setFilterStatus } = useToDo();

  return (
    <div
      className={`${text.presetfilter} flex items-center gap-5 text-foreground ${className}`}
    >
      <button
        onClick={() => setFilterStatus("All")}
        data-active={filterStatus === "All"}
        className={`data-[active=true]:text-primary`}
      >
        All
      </button>
      <button
        onClick={() => setFilterStatus("Active")}
        data-active={filterStatus === `Active`}
        className={`data-[active=true]:text-primary`}
      >
        Active
      </button>
      <button
        onClick={() => setFilterStatus("Completed")}
        data-active={filterStatus === `Completed`}
        className={`data-[active=true]:text-primary`}
      >
        Complete
      </button>
    </div>
  );
};
