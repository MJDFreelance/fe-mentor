import Link from "next/link";
import text from "@/app/photosnap/text.module.css";

export const Menu = () => {
  return (
    <>
      <ul
        className={`${text.link} flex max-md:flex-col gap-9 max-md:items-center w-full uppercase`}
      >
        <li>
          <Link href={`/photosnap/stories`}>stories</Link>
        </li>
        <li>
          <Link href={`/photosnap/features`}>features</Link>
        </li>
        <li>
          <Link href={`/photosnap/pricing`}>pricing</Link>
        </li>
      </ul>
      <hr className={`mx-8 md:hidden bg-black border-black opacity-25`} />
      <button
        className={`py-3 px-6 text-white bg-black w-fit justify-self-center md:justify-self-end`}
      >
        GET AN INVITE
      </button>
    </>
  );
};
