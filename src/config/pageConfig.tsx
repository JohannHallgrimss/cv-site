import React, { lazy, Suspense } from "react";
import type { Translations } from "../translations";

const Home = lazy(() => import("../pages/Home"));
const Knowledge = lazy(() => import("../pages/Knowledge"));
const Experience = lazy(() => import("../pages/Experience"));
const References = lazy(() => import("../pages/References"));
const WebTools = lazy(() => import("../pages/WebTools"));
const ContactMe = lazy(() => import("../pages/ContactMe"));

export type PageConfig = {
  id: string;
  path: string;
  label: keyof Translations["nav"];
  component: React.ReactNode;
};

function renderLazy(Component: React.LazyExoticComponent<any>, props: any) {
  return (
    <Suspense fallback={<div style={{ padding: 24 }} /> }>
      <Component {...props} />
    </Suspense>
  );
}

export function createPages(t: Translations): PageConfig[] {
  return [
    {
      id: "home",
      path: "/",
      label: "home",
      component: renderLazy(Home, { t: t.home }),
    },
    {
      id: "knowledge",
      path: "/knowledge",
      label: "knowledge",
      component: renderLazy(Knowledge, { t: t.knowledge }),
    },
    {
      id: "experience",
      path: "/experience",
      label: "experience",
      component: renderLazy(Experience, { t: t.experience }),
    },
    {
      id: "references",
      path: "/references",
      label: "references",
      component: renderLazy(References, { title: t.references.title, quotes: t.references.quotes }),
    },
    {
      id: "webTools",
      path: "/web-tools",
      label: "webTools",
      component: renderLazy(WebTools, { t: t.webTools }),
    },
    {
      id: "contact",
      path: "/contact",
      label: "contactMe",
      component: renderLazy(ContactMe, {}),
    },
  ];
}
