import { describe, expect, test, vi } from "vitest";
import { appRouter } from "./app.router";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, Outlet, RouterProvider, useParams } from "react-router";

vi.mock("@/heroes/pages/home/HomePage", () => ({
    HomePage: () => <div data-testid="home-page"></div>,
}));

vi.mock("@/heroes/layouts/HeroesLayout", () => ({
    HeroesLayout: () =>
        <div data-testid="hero-layout">
            <Outlet />
        </div>,
}));

vi.mock("@/heroes/pages/hero/HeroPages", () => ({
    HeroPages: () => {
        const { idSlug = '' } = useParams();

        return (
            <div data-testid="hero-page">
                HeroPage - {idSlug}
            </div>
        )
    }
}));

vi.mock("@/heroes/pages/search/SearchPages", () => ({
    default: () => <div data-testid="search-page"></div>
}))

describe('appRouter', () => {

    test('should be configured as expecter', () => {
        expect(appRouter.routes).toMatchSnapshot();
    });

    test('should render home page at root path', () => {

        const router = createMemoryRouter(appRouter.routes, {
            initialEntries: ['/']
        });

        render(<RouterProvider router={router} />);

        //screen.debug();
        expect(screen.getByTestId('home-page')).toBeDefined();
    });

    test('should render hero page at /heroes/:idSlug path', () => {

        const router = createMemoryRouter(appRouter.routes, {
            initialEntries: ['/heroes/superman']
        });

        render(<RouterProvider router={router} />);

        //screen.debug();
        expect(screen.getByTestId('hero-page').innerHTML).toContain('superman');
    });

    test('should render search page at /search path', async () => {

        const router = createMemoryRouter(appRouter.routes, {
            initialEntries: ['/search']
        });

        render(<RouterProvider router={router} />);

        expect(await screen.findByTestId('search-page')).toBeDefined();

        //screen.debug();
    })
})