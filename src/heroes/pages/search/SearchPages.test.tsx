import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, test, vi } from "vitest";
import SearchPages from "./SearchPages";
import { searchHeroesAction } from "@/heroes/actions/search-heros.action";

vi.mock('@/heroes/actions/search-heros.action')
const mockSearchHeroesAction = vi.mocked(searchHeroesAction);

vi.mock('@/components/custom/CustomJumBotron', () => ({
    CustomJumBotron: () => <div data-testid='custom-jumbotrom' />
}))

const queryClient = new QueryClient();

const renderSearchPage = (initialEntries: string[] = ['/']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <QueryClientProvider client={queryClient}>
                <SearchPages />
            </QueryClientProvider>
        </MemoryRouter>
    )
}


describe('SearchPageTest', () => {

    test('should render SearchPage with default valius ', () => {

        const { containter } = renderSearchPage();

        //renderSearchPage();

        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            name: undefined,
            strength: NaN,
        });

        expect(containter).toMatchSnapshot();

        //screen.debug();
    });


})