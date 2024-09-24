"use client";

import Header from "@/components/shared/Header";
import { Sidebar } from "@/components/shared/Sidebar";
import { useParams, usePathname, useRouter } from "next/navigation";

export default function Layout(props: { children: React.ReactNode }) {
  const params = useParams();
  const pathname = usePathname();
  console.log(pathname, "params");
  return (
    <div className="mainBg bg-green-200 text-red-600 min-h-screen pb-20">
      {pathname !== "/" ? (
        <div className="flex">
          <Sidebar />
          <div className="grow p-5">{props.children}</div>
        </div>
      ) : (
        <>
          <Header />
          {props.children}
        </>
      )}
    </div>
  );
}
