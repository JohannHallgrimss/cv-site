import { ReactNode } from "react";
import Home from "../pages/Home";
import Knowledge from "../pages/Knowledge";
import Experience from "../pages/Experience";
import References from "../pages/References";
import type { Translations } from "../translations";

export type PageConfig = {
  id: string;
  path: string;
  label: keyof Translations["nav"];
  component: ReactNode;
};

export function createPages(t: Translations): PageConfig[] {
  return [
    {
      id: "home",
      path: "/",
      label: "home",
      component: <Home t={t.home} />,
    },
    {
      id: "knowledge",
      path: "/knowledge",
      label: "knowledge",
      component: <Knowledge t={t.knowledge} />,
    },
    {
      id: "experience",
      path: "/experience",
      label: "experience",
      component: <Experience t={t.experience} />,
    },
    {
      id: "references",
      path: "/references",
      label: "references",
      component: <References title={t.references.title} quotes={t.references.quotes} />,
    },
  ];
}
