import { describe, expect, test } from "vitest";
import { getHeroAction } from "./get-hero.Action";


describe('getHeroAction', () => {
    test('should fetch hero data and return with complete image url', async () => {
        const resultado = await getHeroAction('clark-kent');

        expect(resultado.image).toContain('http');
        expect(resultado).toStrictEqual;
    });

    test('should throw an error if hero is not found', async () => {
        const idSlug = 'batman-2';

        const result = await getHeroAction(idSlug).catch((error) => {
            expect(error).toBeDefined();
            expect(error.message).toBe('Request failed with status code 404');
        });

        expect(result).toBeUndefined();
    });

})