import { CustomJumBotron } from '@/components/custom/CustomJumBotron';
import { HeroStats } from '@/heroes/components/HeroStats';
import { SearchControl } from './ui/SearchControl';
import { CustomBreadcrums } from '@/components/custom/CustomBreadcrums';
import { useSearchParams } from 'react-router';
import { useSearchHero } from '@/heroes/hooks/useSearchHero';
import { HeroGrid } from '@/heroes/components/HeroGrid';

export const SearchPages = () => {

    const [searchParams] = useSearchParams();

    const nameHero = searchParams.get('name') ?? '';
    const strength = Number(searchParams.get('strength') ?? '0');


    const { data: searchHero } = useSearchHero(nameHero, strength);

    return (
        <>
            <CustomJumBotron
                title="Búsqueda de SuperHeroes"
                description="Busca, investiga e informate"
            />
            <CustomBreadcrums currentPage="Buscador de héroes"
                breadcrumbs={[
                    { label: 'Home1', to: '/' },
                    { label: 'Home2', to: '/' },
                    { label: 'Home3', to: '/' },
                ]}
            />

            {/* Stats Dashboard */}
            <HeroStats />

            {/*Filter and Search */}
            <SearchControl />

            <HeroGrid heroProps={searchHero} />
        </>
    )
}


export default SearchPages;