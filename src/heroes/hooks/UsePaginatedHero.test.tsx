import type { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { usePaginatedHero } from "./usePaginatedHero";
import { getHeroesByPagesAction } from "../actions/get-heroes-by-pages.action";


vi.mock("../actions/get-heroes-by-pages.action", () => ({
    getHeroesByPagesAction: vi.fn()
}))

const mockGetHeroesByPageAction = vi.mocked(getHeroesByPagesAction);

//extraemos cliente query para llamado modular
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false
        }
    }
})

const tanStackCustomProvider = () => {
    return ({ children }: PropsWithChildren) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}


describe('usePaginatedHero', () => {

    //refresca caché de cada petición.
    beforeEach(() => {
        vi.clearAllMocks();
        queryClient.clear();
    });


    test('should return the initial state (isLoading)', () => {

        const { result } = renderHook(() => usePaginatedHero(2, 2), {
            wrapper: tanStackCustomProvider(),
        });

        expect(result.current.isLoading).toBe(true);
        expect(result.current.isError).toBe(false);
        expect(result.current.data).toBe(undefined);

        //confirmación de NO recepción de data y validación de resultado
        expect(result.current.isSuccess).toBe(false);
    });

    test('should return success state with data when API call succeds', async () => {
        const mockHeroesData = {
            total: 20,
            pages: 4,
            heroes: [],
        };

        mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData);

        const { result } = renderHook(() => usePaginatedHero(3, 9), {
            wrapper: tanStackCustomProvider(),
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        })

        expect(result.current.status).toBe('success');
        expect(mockGetHeroesByPageAction).toHaveBeenCalled();
        expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(3, 9, 'all');
    })

    test('should call getHeroesByPageActions with arguments', async () => {
        const mockHeroesData = {
            total: 20,
            pages: 4,
            heroes: [],
        };

        mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData);

        const { result } = renderHook(() => usePaginatedHero(3, 9, 'HeroesD'), {
            wrapper: tanStackCustomProvider(),
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        })

        expect(result.current.status).toBe('success');
        expect(mockGetHeroesByPageAction).toHaveBeenCalled();
        expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(3, 9, 'HeroesD');
    })


})
