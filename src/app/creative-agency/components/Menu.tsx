import Logo from "@/app/creative-agency/icons/logo.svg";
import Hamburger from "@/app/creative-agency/icons/icon-hamburger.svg";

export const Menu = () => {
  return (
    <section className={`flex justify-between px-6 py-10`}>
      <Logo />
      <menu>
        <Hamburger />
      </menu>
    </section>
  );
};
