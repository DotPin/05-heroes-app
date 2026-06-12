import { useQuery } from "@tanstack/react-query"
import { getHeroAction } from "../actions/get-hero.Action";

export const useHero = (idSlug: string) => {
    return useQuery({
        queryKey: ['heroe', idSlug],
        queryFn: () => getHeroAction(idSlug),
        retry: false,
    });
}