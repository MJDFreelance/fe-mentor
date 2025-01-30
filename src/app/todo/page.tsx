import text from "@/app/todo/text.module.css";
import { ToDoForm } from "@/app/todo/components/ToDoForm";
import { ToDoCategories, ToDoList } from "@/app/todo/components/ToDoList";
import { Header } from "@/app/todo/components/Header";

const scene = text;

const Page = () => {
  return (
    <>
      <Header />
      <section className={`grid gap-6`}>
        <ToDoForm />
        <ToDoList />
      </section>
      <div
        className={`${scene.status} my-4 flex justify-center rounded-[5px] bg-background py-4 md:hidden`}
      >
        <ToDoCategories />
      </div>
      <div
        className={`mt-10 flex w-full justify-center text-secondary-foreground md:mt-12`}
      >
        Drag and drop to reorder list
      </div>
    </>
  );
};

export default Page;
