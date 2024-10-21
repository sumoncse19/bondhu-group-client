"use client";
import React, { useState } from "react";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "../components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function NavbarDemo() {
  return (
    <div className="relative w-fit flex items-center justify-center  px-2">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-xl mx-auto  z-50", className)}
    >
      <Menu setActive={setActive}>
        <Link href="/" className="text-black ">
          Home
        </Link>
        <MenuItem setActive={setActive} active={active} item="Institutional">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="">Board Directors</HoveredLink>
            <HoveredLink href="">Company Principles</HoveredLink>
            <HoveredLink href="/institutional/certificates">
              Our Certificates
            </HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Projects">
          <div className="  text-sm grid grid-cols-3 gap-5 p-4">
            <ProductItem
              title="Bondhu Builder's"
              href=""
              src="/images/bondhuBuilders.jpeg"
              description="Prepare for tech interviews like never before."
            />
            <ProductItem
              title="Bondhu Super Shop"
              href=""
              src="/images/bondhuSuperShop.jpeg"
              description="Production ready Tailwind css components for your next project"
            />
            <ProductItem
              title="Bondhu Agro & Agriculture"
              href=""
              src="/images/bondhuAgro.jpeg"
              description="Never write from scratch again. Go from idea to blog in minutes."
            />
            <ProductItem
              title="Bondhu Resort"
              href=""
              src="/images/bondhuResort.jpeg"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
            <ProductItem
              title="Bondhu Brokerage"
              href=""
              src="/images/bondhuResort.jpeg"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
            <ProductItem
              title="Bondhu IT Institute"
              href=""
              src="/images/bondhuIT.jpeg"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
            <ProductItem
              title="Bondhu Tour & Travells"
              href=""
              src="/images/bondhuTourTravels.jpg"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
            <ProductItem
              title="Bondhu General Hospital"
              href=""
              src="/images/bondhuHospitals.jpeg"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
            <ProductItem
              title="Bondhu Food & Bevarage"
              href=""
              src="/images/bondhuBevarage.webp"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
            <ProductItem
              title="Bondhu Garments"
              href=""
              src="/images/bondhuGarments.webp"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
            <ProductItem
              title="Bondhu Parcel And Currier Service"
              href=""
              src="/images/bondhuParcel.webp"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
            <ProductItem
              title="Bondhu Transport"
              href=""
              src="/images/bondhuTransport.jpeg"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Events">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/hobby">Business Extension Program</HoveredLink>
            <HoveredLink href="/individual">General Program</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
