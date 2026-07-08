import { describe, expect, test, vi } from "vitest";
import { appRouter } from "./app.router";
import { render, screen } from "@testing-library/react";
import { Outlet, RouterProvider } from "react-router";

vi.mock("@/heroes/pages/home/HomePage", () => ({
    HomePage: () => <div data-testid="home-page"></div>,
}));

vi.mock("@/heroes/layouts/HeroesLayout", () => ({
    HeroesLayout: () =>
        <div data-testid="hero-layout">
            <Outlet />
        </div>,
}));

describe('appRouter', () => {

    test('should be configured as expecter', () => {
        expect(appRouter.routes).toMatchSnapshot();
    });

    test('should render home page at root path', () => {
        render(<RouterProvider router={appRouter} />);

        screen.debug();
        expect(screen.getByTestId('home-page')).toBeDefined();
    })
})