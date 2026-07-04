import { beforeEach, describe, expect, test, vi } from "vitest";
import {
    FavoriteHeroContext,
    FavoriteHeroProvider
} from "./FavoriteHeroContext";
import { fireEvent, render, screen } from "@testing-library/react";
import { use } from "react";
import type { Hero } from "../types/hero.interface";

//alternativa de creación de interfaz de Hero:
//interfaz Hero = {
//..
//}

const mockHero = {
    id: '1',
    name: 'batman'
} as Hero;

//se crea un componente que requiera renderización
const TestComponent = () => {

    const { favoriteCount, favorites, isFavorite, toggleFavorite } = use(FavoriteHeroContext)

    use(FavoriteHeroContext);

    return (
        <div>
            <div data-testid="favorite-count">{favoriteCount}</div>
            <div data-testid="favorite-list">
                {
                    favorites.map(hero => (
                        <div key={hero.id} data-testid={`hero-${hero.id}`}>
                            {hero.name}
                        </div>
                    ))
                }
            </div>
            <button data-testid="toggle-favorite"
                onClick={() => toggleFavorite(mockHero)}>
                Tobble Favorite
            </button>
            <div
                data-testid="is-favorite"
            >
                {isFavorite(mockHero).toString()}
            </div>

        </div >
    );
};

//se crea un contexto que permita renderización del componente
const renderContextTest = () => {
    return render(
        <FavoriteHeroProvider>
            <TestComponent />
        </FavoriteHeroProvider>
    )
}

const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn(),
};

Object.defineProperty(window, 'localStorafe', {
    value: localStorageMock,
});


describe('FavoriteHeroContext', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    })

    test('should intialize with defaul values', () => {

        renderContextTest();

        screen.debug();

        expect(screen.getByTestId("favorite-count").textContent).toBe('0');
        expect(screen.getByTestId('favorite-list').children.length).toBe(0);
    });

    test('should add hero to favorite wnen toggleFavorite is called with false', () => {

        renderContextTest();

        const button = screen.getByTestId('toggle-favorite');

        fireEvent.click(button);
        //screen.debug();

        //console.log(localStorage.getItem('favorites'));
        expect(screen.getByTestId('is-favorite').textContent).toBe('true');
        expect(screen.getByTestId('favorite-count').textContent).toBe('1');
        expect(screen.getByTestId('hero-1').textContent).toBe('batman');

        expect(localStorageMock.setItem).toHaveBeenCalled();


    });

    test('should add hero to favorite wnen toggleFavorite is called with another false', () => {

        localStorageMock.getItem.mockReturnValue(JSON.stringify([mockHero]));

        //renderización en bruto
        renderContextTest();
        expect(screen.getByTestId('favorite-count').textContent).toBe('1');
        expect(screen.getByTestId('is-favorite').textContent).toBe('true');
        expect(screen.getByTestId('hero-1').textContent).toBe('batman');

        const button = screen.getByTestId('toggle-favorite');
        fireEvent.click(button);

        expect(screen.getByTestId('favorite-count').textContent).toBe('0');
        expect(screen.getByTestId('is-favorite').textContent).toBe('false');
        expect(screen.queryByTestId('hero-1')).toBeNull();

        expect(localStorageMock.setItem).toHaveBeenCalled();
        expect(localStorageMock.setItem).toHaveBeenCalledWith("favorites", '[]');
    });
})