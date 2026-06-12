import { useQuery } from '@tanstack/react-query'
import { searchHeroesAction } from '../actions/search-heros.action'

export const useSearchHero = (name: string) => {
    return useQuery({
        queryKey: ['Search', { name }],
        queryFn: () => searchHeroesAction({ name }),
        staleTime: 1000 * 60 * 3,
    })
}
