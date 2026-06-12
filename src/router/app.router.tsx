import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";

import { AdminLayout } from "@/admin/layouts/AdminLayout";
import { AdminPage } from "@/admin/pages/AdminPage";
import { HeroesLayout } from "@/heroes/layouts/HeroesLayout";
import { HeroPages } from "@/heroes/pages/hero/HeroPages";
import { HomePage } from "@/heroes/pages/home/HomePage";
//import { SearchPages } from "@/heroes/pages/search/SearchPages";

const SearchPages = lazy(() => import('@/heroes/pages/search/SearchPages'));

export const appRouter = createBrowserRouter([

    {
        path: '/',
        element: <HeroesLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: '/heroes/:idSlug',
                element: <HeroPages />,
            },
            {
                path: '/search',
                element: <SearchPages />,
            },
            {
                path: '*',
                element: <Navigate to="/" />
            }
        ],
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <AdminPage />,
            },

        ],
    }

]);