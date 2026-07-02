import type { PropsWithChildren } from "react";
import { describe, expect, test, vi } from "vitest";
import { renderHook, waitFor } from '@testing-library/react'
import { useHeroSummary } from "./useHeroSummary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getSummaryAction } from "../actions/get-summary.actions";
import type { SummaryInformationResponse } from "../types/summary-information.response";


//Vista HTML de método
vi.mock('../actions/get-summary.actions', () => ({
    getSummaryAction: vi.fn(),
}));


const mockGetSummaryAction = vi.mocked(getSummaryAction);

const tanStackCustomProvider = () => {

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false
            }
        }
    })

    return ({ children }: PropsWithChildren) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}

describe('useHeroSummary', () => {

    test('should return the initial state (isLoading)', () => {

        const { result } = renderHook(() => useHeroSummary(), {
            wrapper: tanStackCustomProvider(),
        });


        expect(result.current.isLoading).toBe(true);
        expect(result.current.isError).toBe(false);
        expect(result.current.data).toBe(undefined)
        expect(result.current.data).toBeUndefined();

    });

    test('should return success state with data when API call succeeds', async () => {

        const mockSummaryData = {
            totalHeroes: 10,
            strongestHero: {
                id: '1',
                name: 'Batman'
            },
            smartestHero: {
                id: '2',
                name: 'Batman'
            },
            heroCount: 20,
            villainCount: 7
        } as SummaryInformationResponse;

        //Genera data sintética en Front
        mockGetSummaryAction.mockResolvedValue(mockSummaryData);

        const { result } = renderHook(() => useHeroSummary(), {
            wrapper: tanStackCustomProvider()
        })

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        })

        expect(result.current.isError).toBe(false);
        expect(mockGetSummaryAction).toHaveBeenCalled();
    })

    test('should return error state when API call fails', async () => {

        const mockError = new Error('Failed to fetch summary');

        mockGetSummaryAction.mockRejectedValue(mockError);

        //sintetiza una petición http:
        const { result } = renderHook(() => useHeroSummary(), {
            wrapper: tanStackCustomProvider(),
        });

        //Prueba y revisa los estados de la petición http
        await waitFor(() => {
            expect(result.current.isError).toBe(true);
        })

        expect(result.current.error).toBeDefined()
        expect(result.current.isLoading).toBe(false);
        expect(mockGetSummaryAction).toHaveBeenCalled();
        expect(result.current.error?.message).toBe('Failed to fetch summary');


    });

});
