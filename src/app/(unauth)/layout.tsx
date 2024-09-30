"use client";

import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { Sidebar } from "@/components/shared/Sidebar";
import { useParams, usePathname, useRouter } from "next/navigation";

export default function Layout(props: { children: React.ReactNode }) {
  const params = useParams();
  const pathname = usePathname();

  return (
    <div className="mainBg bg-[#EAE9E8] text-red-600 min-h-screen ">
      {pathname !== "/" ? (
        <div className="flex">
          <Sidebar />
          <div className="grow self-start p-5">{props.children}</div>
        </div>
      ) : (
        <div className="flex flex-col justify-between items-center">
          <Header />
          {props.children}
          <Footer />
        </div>
      )}
    </div>
  );
}
