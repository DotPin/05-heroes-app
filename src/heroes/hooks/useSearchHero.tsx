import { useQuery } from '@tanstack/react-query'
import { searchHeroesAction } from '../actions/search-heros.action'

export const useSearchHero = (name: string, strength: number) => {
    return useQuery({
        queryKey: ['Search', { name, strength }],
        queryFn: () => searchHeroesAction({ name, strength }),
        staleTime: 1000 * 60 * 3,
    })
}
