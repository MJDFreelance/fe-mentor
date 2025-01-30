import { ReactNode } from "react";

export const StrategicApproach = ({ children }: { children: ReactNode }) => {
  return (
    <section
      className={`flex flex-col md:grid md:grid-cols-[330fr_48fr_390fr] md:grid-rows-[auto_200px_auto] md:grid-areas-[img1_img2_strat|img3_appr_appr|aprh_appr_appr]`}
    >
      {children}
    </section>
  );
};
