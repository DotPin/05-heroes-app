import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { SearchControl } from "./SearchControl";
import { MemoryRouter } from "react-router";

if (typeof window.ResizeObserver === 'undefined') {
    class ResizeObserver {
        observe() { }
        unobserve() { }
        disconect() { }
    }
    window.ResizeObserver = ResizeObserver;
}

const renderWithRouter = (initialEntries: string[] = ['/']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <SearchControl />
        </MemoryRouter>
    );
};

describe('SearchControlTest', () => {
    test('should render SearchControls with default values', () => {
        const { containter } = renderWithRouter();

        expect(containter).toMatchSnapshot();
    });

    test('should set input value when search param name is set', () => {
        renderWithRouter(['/?name=Batman']);

        const input = screen.getByPlaceholderText('Search heroes, villains, powers, teams...');
        expect(input.getAttribute('value')).toBe('Batman');
    })

    test('should change params when input is changed and enter is pressed', () => {
        renderWithRouter(['/?name=Batman']);

        const input = screen.getByPlaceholderText('Search heroes, villains, powers, teams...');
        expect(input.getAttribute('value')).toBe('Batman');

        fireEvent.change(input, { target: { value: 'Superman' } })
        fireEvent.keyDown(input, { key: 'Enter' })
        expect(input.getAttribute('value')).toBe('Superman');

        //screen.debug(input)
    })
})