import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Level from "./Level";
import LevelSelection from "./LevelSelection";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "levelSelection",
        element: <LevelSelection />,
    },
    {
        path: "level/:id",
        element: <Level />,
    },
]);

const domNode = document.getElementById("root");

const root = createRoot(domNode);

root.render(<RouterProvider router={router} />);
