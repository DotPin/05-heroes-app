import { describe, expect, test, vi } from "vitest";
import { HomePage } from "./HomePage";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock('@/heroes/hooks/usePaginatedHero')

const mockUsePaginatedHero = vi.mocked(usePaginatedHero);

mockUsePaginatedHero.mockReturnValue({
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: true
} as unknown as ReturnType<typeof usePaginatedHero>);

const queryClient = new QueryClient();

const renderHomePage = (initialEntries: string[] = ['/']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <QueryClientProvider client={queryClient}>
                <HomePage />
            </QueryClientProvider>
        </MemoryRouter>
    );
};


describe('HomePage', () => {

    test('should render HomePage with default values', () => {
        const { container } = renderHomePage();

        expect(container).toMatchSnapshot();
    });


});