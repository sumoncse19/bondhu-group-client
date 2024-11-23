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
    <div className="relative w-fit hidden lg:flex lg:items-center lg:justify-center px-2 ">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn(
        "fixed top-10 inset-x-0 max-w-2xl mx-auto  z-50",
        className
      )}
    >
      <Menu setActive={setActive}>
        <MenuItem
          setActive={setActive}
          active={active}
          item="Home"
          href="/"
        ></MenuItem>
        <MenuItem setActive={setActive} active={active} item="Institutional">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/institutional/board-directors">
              Board Directors
            </HoveredLink>
            <HoveredLink href="">Company Principles</HoveredLink>
            <HoveredLink href="/institutional/certificates">
              Our Certificates
            </HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Projects">
          <div className="w-full  text-sm grid grid-cols-2 gap-3 p-4">
            <ProductItem
              title="Bondhu Builder's"
              href="/projects/bondhu-builders"
              src="/images/bondhuBuilders.jpeg"
              description="Prepare for tech interviews like never before."
            />
            <ProductItem
              title="Bondhu Super Shop"
              href="/projects/bondhu-super-shop"
              src="/images/bondhuSuperShop.jpeg"
              description="Production ready Tailwind css components for your next project"
            />
            <ProductItem
              title="Bondhu Agro & Agriculture"
              href="/projects/bondhu-agro-agriculture"
              src="/images/bondhuAgro.jpeg"
              description="Never write from scratch again. Go from idea to blog in minutes."
            />
            <ProductItem
              title="Bondhu Resort"
              href="/projects/bondhu-builders"
              src="/images/bondhuResort.jpeg"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
            <ProductItem
              title="Bondhu Brokerage"
              href="/projects/bondhu-builders"
              src="/images/bondhuBrokerage.jpg"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
            <ProductItem
              title="Bondhu IT Institute"
              href="/projects/bondhu-builders"
              src="/images/bondhuIT.jpeg"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
            <ProductItem
              title="Bondhu Tour & Travells"
              href="/projects/bondhu-builders"
              src="/images/bondhuTourTravels.jpg"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
            <ProductItem
              title="Bondhu General Hospital"
              href="/projects/bondhu-builders"
              src="/images/bondhuHospitals.jpeg"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
            <ProductItem
              title="Bondhu Food & Bevarage"
              href="/projects/bondhu-builders"
              src="/images/bondhuBevarage.webp"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
            <ProductItem
              title="Bondhu Garments"
              href="/projects/bondhu-builders"
              src="/images/bondhuGarments.webp"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
            <ProductItem
              title="Bondhu Parcel And Currier Service"
              href="/projects/bondhu-builders"
              src="/images/bondhuParcel.webp"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
            <ProductItem
              title="Bondhu Transport"
              href="/projects/bondhu-builders"
              src="/images/bondhuTransport.jpeg"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Events">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="">Business Extension Program</HoveredLink>
            <HoveredLink href="">General Program</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Magazine">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="">Bondhu Magazine</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Media Partner">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="">Daily BondhuPotro</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
