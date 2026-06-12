import { getHeroesByPagesAction } from '../actions/get-heroes-by-pages.action';
import { useQuery } from '@tanstack/react-query';

export const usePaginatedHero = (page: number, limit: number, category = 'all') => {
    return useQuery({
        queryKey: ['heroes', { page, limit, category }],
        queryFn: () => getHeroesByPagesAction(+page, +limit, category),
        //Congela una consulta y la mantiene en memoria local
        staleTime: 1000 * 60 * 5, //5 minutos
    });
}
