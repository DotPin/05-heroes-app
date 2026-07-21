import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, test, vi } from "vitest";
import SearchPages from "./SearchPages";
import { searchHeroesAction } from "@/heroes/actions/search-heros.action";
import type { Hero } from "@/heroes/types/hero.interface";

vi.mock('@/heroes/actions/search-heros.action')
const mockSearchHeroesAction = vi.mocked(searchHeroesAction);

vi.mock('@/components/custom/CustomJumBotron', () => ({
    CustomJumBotron: () => <div data-testid='custom-jumbotrom' ></div>
}));

vi.mock('./ui/SearchControl', () => ({
    SearchControl: () => <div data-testid='search-controls' ></div>
}));


vi.mock('@/heroes/components/HeroGrid', () => ({
    HeroGrid: ({ heroProps }: { heroProps: Hero[] }) => (
        <div data-testid="hero-grid">
            {
                heroProps.map((hero) => (
                    <div key={hero.id}>{hero.name}</div>
                ))
            }
        </div>
    ),
}));

const queryClient = new QueryClient();

const renderSearchPage = (initialEntries: string[] = ['/']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <QueryClientProvider client={queryClient}>
                <SearchPages />
            </QueryClientProvider>
        </MemoryRouter>
    );
};

describe('SearchPageTest', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    })

    test('should render SearchPage with default values ', () => {

        const { container } = renderSearchPage();

        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            name: "",
            strength: 0,
        });

        expect(container).toMatchSnapshot();
    });

    test('should call search action with name parameter', () => {

        const { container } = renderSearchPage(['/search?name=superman']);

        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            name: 'superman',
            strength: 0,
        });

        expect(container).toMatchSnapshot();


    });

    test('should call search action with strength parameter', () => {

        const { container } = renderSearchPage(['/search?strength=10']);

        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            name: "",
            strength: 10,
        });

        expect(container).toMatchSnapshot();


    });

    test('should call search action with strength and name parameter', () => {

        const { container } = renderSearchPage(['/search?name=batman&strength=6']);

        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            name: 'batman',
            strength: 6,
        });

        expect(container).toMatchSnapshot();

    });

    test('should render HeroGrid with search result', async () => {

        //enviamos Query parameters
        const mockHeroes = [
            { id: '1', name: 'Clark Kent' } as unknown as Hero,
            { id: '2', name: 'Bruce Wayne' } as unknown as Hero,
        ]

        mockSearchHeroesAction.mockResolvedValue(mockHeroes);

        renderSearchPage();

        await waitFor(() => {
            expect(screen.getByText('Clark Kent')).toBeDefined();
            expect(screen.getByText('Bruce Wayne')).toBeDefined()
            //permite mostrar componente cual se desea probar
            //screen.debug([
            //    screen.getByTestId('hero-grid'),
            //]);
        })

    })

});
