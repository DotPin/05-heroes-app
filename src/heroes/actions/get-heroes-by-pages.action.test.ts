import { beforeEach, describe, expect, test } from "vitest"
import { getHeroesByPagesAction } from "./get-heroes-by-pages.action"
import AxiosMockAdapter from 'axios-mock-adapter';
import { heroApi } from "../api/hero.api";


const BASE_URL = import.meta.env.VITE_API_URL;

describe('getHeroesByPageAction', () => {

    const heroesApiMock = new AxiosMockAdapter(heroApi);

    beforeEach(() => {
        heroesApiMock.reset();
    })

    test('should return default heroes', async () => {
        heroesApiMock.onGet('/').reply(200, {
            total: 10,
            pages: 2,
            heroes: [
                { image: `1.jpg` },
                { image: `2.jpg` },
            ],
        });

        const respoonse = await getHeroesByPagesAction(1);

        expect(respoonse).toStrictEqual({
            total: 10,
            pages: 2,
            heroes: [
                { image: `${BASE_URL}/images/1.jpg` },
                { image: `${BASE_URL}/images/2.jpg` },
            ],
        });

        //console.log(respoonse)
    });

    test('should return the correct heroes when page is not a number', async () => {
        const responseObject = {
            total: 10,
            pages: 2,
            heroes: [],
        }

        heroesApiMock.onGet('/').reply(200, responseObject);
        heroesApiMock.resetHistory();

        await getHeroesByPagesAction('abc' as unknown as number);

        //Posible técnica de scraping
        const params = heroesApiMock.history.get[0].params;
        expect(params).toStrictEqual({ limit: 6, offset: 0, category: 'all' });

    });

    test('should the api with correct params/IP/{UNAME}', async () => {
        const responseObject = {
            total: 10,
            pages: 1,
            heroes: [],
        }

        heroesApiMock.onGet('/').reply(200, responseObject);
        heroesApiMock.resetHistory();

        await getHeroesByPagesAction(2, 10, 'heroes');

        const params = heroesApiMock.history.get[0].params;

        //MODEL: expect.(params).toStrictEqual({limit: 10, offset: 0, category: 'favorites'});
        expect(params).toStrictEqual({ limit: 10, offset: 10, category: 'heroes' });

    });

})