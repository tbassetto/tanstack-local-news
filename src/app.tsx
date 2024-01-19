import { Router, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
// import qs from "query-string";

import { routeTree } from "./routeTree.gen";

const router = new Router({
  routeTree,
  // For historical reasons our app use something similar to arrayFormat: 'none' AND also remove params that are undefined
  // https://github.com/sindresorhus/query-string configuration would help us migrate to tanstack router
  // stringifySearch: (obj) => qs.stringify(obj),
  // parseSearch: (str) => qs.parse(str),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
