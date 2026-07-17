"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { HomePage } from "@/components/home-page";
import { ArtistsPage } from "@/components/artists-page";
import { ReleasesPage } from "@/components/releases-page";
import { SetlistPage } from "@/components/setlist-page";
import { BrandsPage } from "@/components/brands-page";
import { ContactPage } from "@/components/contact-page";
import { AppsPage } from "@/components/apps-page";
import { MetaFixPage } from "@/components/metafix-page";

type PageType = "home" | "artists" | "releases" | "setlist" | "brands" | "contact" | "apps" | "metafix";

export function OolkaApp() {
  const [activePage, setActivePage] = useState<PageType>("home");

  return (
    <div className="min-h-screen flex flex-col bg-black text-white overflow-x-hidden">
      <Navigation activePage={activePage} setActivePage={setActivePage} />
      <main className={`flex-1 flex flex-col ${activePage !== "metafix" ? "pt-16" : ""}`}>
        <AnimatePresence mode="wait">
          {activePage === "home" && (
            <HomePage key="home" setActivePage={setActivePage} />
          )}
          {activePage === "artists" && <ArtistsPage key="artists" />}
          {activePage === "releases" && <ReleasesPage key="releases" />}
          {activePage === "setlist" && <SetlistPage key="setlist" />}
          {activePage === "brands" && <BrandsPage key="brands" />}
          {activePage === "contact" && <ContactPage key="contact" />}
          {activePage === "apps" && <AppsPage key="apps" setActivePage={setActivePage} />}
          {activePage === "metafix" && <MetaFixPage key="metafix" setActivePage={setActivePage} />}
        </AnimatePresence>
      </main>
      <Footer setActivePage={setActivePage} />
    </div>
  );
}
