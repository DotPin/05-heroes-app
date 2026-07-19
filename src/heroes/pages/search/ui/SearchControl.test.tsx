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
    });

    test('should change params strength when slider changed', () => {

        renderWithRouter(['/?name=Batman&active-accordion=advance-filters']);
        const slider = screen.getByRole('slider');

        expect(slider.getAttribute('aria-valuenow')).toBe('0');

        fireEvent.keyDown(slider, { key: 'ArrowRight' });

        expect(slider.getAttribute('aria-valuenow')).toBe('1')

    });

    test('should accordion be open when active-accordion param is set', () => {

        renderWithRouter(['/?name=Batman&active-accordion=advance-filters']);

        const accordion = screen.getByTestId('accordion');
        const accordionItem = accordion.querySelector('div');

        expect(accordionItem?.getAttribute('data-state')).toBe('open')

    });

    test('should accordion be open when active-accordion param is nor set', () => {

        renderWithRouter(['/?name=Batman']);

        const accordion = screen.getByTestId('accordion');
        const accordionItem = accordion.querySelector('div');

        expect(accordionItem?.getAttribute('data-state')).toBe('closed')

    });
})