"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { FaMinus, FaPlus } from "react-icons/fa";

interface SidebarProps {
  navs: {
    id: number;
    title: string;
    link: string;
    subMenu?: {
      id: number;
      title: string;
      link: string;
    }[];
  }[];
  setIsSidebarOpen: (value: boolean) => void;
  isSubMenuOpen: { state: boolean; value: string };
  setIsSubMenuOpen: (payload: { state: boolean; value: string }) => void;
}
const MobileSidebar: React.FC<SidebarProps> = ({
  navs,
  setIsSidebarOpen,
  isSubMenuOpen,
  setIsSubMenuOpen,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="w-52 h-screen overflow-y-auto bg-red-50 fixed top-0 right-0 z-[1000000000000000] py-8 px-4">
      {/* close button */}
      <div className="mb-3">
        <AiFillCloseSquare
          onClick={() => setIsSidebarOpen(false)}
          className="text-2xl mb-3"
        />
      </div>
      <div className="flex flex-col gap-y-4">
        {navs?.map((nav) => (
          <div>
            {/* main menu */}
            <div
              key={nav.id}
              className={` ${pathname === nav.link && "bg-teal-200"} text-black border-2 p-2 rounded-md flex justify-between items-center`}
            >
              <p onClick={() => router.push(nav.link)}> {nav.title}</p>
              {nav?.subMenu &&
                (isSubMenuOpen.state && isSubMenuOpen.value === nav.title ? (
                  <FaMinus
                    onClick={() =>
                      setIsSubMenuOpen({ state: false, value: "" })
                    }
                  />
                ) : (
                  <FaPlus
                    onClick={() =>
                      setIsSubMenuOpen({ state: true, value: nav.title })
                    }
                  />
                ))}
            </div>

            {/* sub menu */}
            {isSubMenuOpen.state && isSubMenuOpen.value === nav.title && (
              <div className="flex flex-col gap-y-4 px-4 py-2 text-sm">
                {nav?.subMenu?.map((submenu) => (
                  <div className="px-2 py-1 rounded-md" key={submenu.id}>
                    <p
                      className="border-b pb-2"
                      onClick={() => router.push(submenu.link)}
                    >
                      {" "}
                      {submenu?.title}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileSidebar;
