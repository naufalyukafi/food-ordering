import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { router } from "./router";
import { PageSkeleton, DashboardBroken } from "./components";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <ErrorBoundary fallback={<DashboardBroken />}>
      <Suspense fallback={<PageSkeleton />}>
        <ChakraProvider>
          <RouterProvider router={router} />
        </ChakraProvider>
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>
);
