"use client";

import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

export type ToDo = {
  id: string;
  name: string;
  completed: boolean;
};

type ValueType = {
  toDos: ToDo[];
  setToDos: Dispatch<SetStateAction<ToDo[]>>;
  filterStatus?: "All" | "Active" | "Completed";
  setFilterStatus: Dispatch<SetStateAction<"All" | "Active" | "Completed">>;
  filteredToDos: ToDo[];
  clearCompleted?: () => void;
  setItemCompleted?: (id: string, isCompleted: boolean) => void;
};

const ToDoContext = createContext<ValueType>({
  toDos: [],
  setToDos: () => {},
  filterStatus: "All",
  setFilterStatus: () => {},
  filteredToDos: [],
  clearCompleted: () => {},
  setItemCompleted: () => {},
});
export const useToDo = () => useContext(ToDoContext);
export const ToDoProvider: FC<{ children?: ReactNode | undefined }> = (
  props,
) => {
  const [toDos, setToDos] = useState<ToDo[]>([]);
  const [filterStatus, setFilterStatus] = useState<
    "All" | "Active" | "Completed"
  >("All");

  const clearCompleted = () => {
    setToDos((prev) => prev.filter((toDo) => !toDo.completed));
  };

  const setItemCompleted = (id: string, isCompleted: boolean) => {
    setToDos((prev) =>
      prev.map((toDo) => {
        if (toDo.id === id) {
          return { ...toDo, completed: isCompleted };
        }
        return toDo;
      }),
    );
  };

  const filteredToDos = useMemo(
    () =>
      toDos.filter((toDo) => {
        if (filterStatus === "All") return true;
        if (filterStatus === "Active") return !toDo.completed;
        if (filterStatus === "Completed") return toDo.completed;
        return true;
      }) ?? [],
    [toDos, filterStatus],
  );

  return (
    <ToDoContext.Provider
      value={{
        toDos,
        setToDos,
        filterStatus,
        setFilterStatus,
        filteredToDos,
        clearCompleted,
        setItemCompleted,
      }}
    >
      {props.children}
    </ToDoContext.Provider>
  );
};
