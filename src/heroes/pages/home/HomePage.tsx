import { useSearchParams } from "react-router"
import { use, useMemo } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumBotron } from "@/components/custom/CustomJumBotron"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadcrums } from "@/components/custom/CustomBreadcrums"

import { useHeroSummary } from "@/heroes/hooks/useHeroSummary"
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext"



export const HomePage = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const activeTab = searchParams.get('tab') ?? 'all';
    const page = searchParams.get('page') ?? '1';
    const limit = searchParams.get('limit') ?? '6';
    const category = searchParams.get('category') ?? 'all';

    //validación de modificación de URL
    const selectedTab = useMemo(() => {
        const validTabs = ['all', 'favorites', 'heroes', 'villains'];
        return validTabs.includes(activeTab) ? activeTab : 'all'
    }, [activeTab])


    const { data: heroesResponse } = usePaginatedHero(+page, +limit, category);
    const { data: summary } = useHeroSummary();

    // Filtrado Manual, Problema no se ordena según índice de paginación -> const hero = heroesResponse?.heroes.filter((hr) => hr.category === 'Hero')
    // Filtrado Manual, Problema no se ordena según índice de paginación -> const villains = heroesResponse?.heroes.filter((hr) => hr.category === 'Villain')
    //console.log(villains);
    const { favoriteCount, favorites } = use(FavoriteHeroContext);

    return (
        <>
            <>
                {/* Header */}
                <CustomJumBotron
                    title="Página de SuperHeroes"
                    description="Héros, Antihéroes, Villanos y más"
                />

                {/* Hiperenlaces */}
                <CustomBreadcrums
                    currentPage="Super Héroes"
                    breadcrumbs={[
                        { label: 'Search Hero', to: '/search' },
                    ]}
                />

                {/* Stats Dashboard */}
                <HeroStats />

                {/* Tabs */}
                <Tabs value={selectedTab} className="mb-8">

                    {/* Sección de flitrado de información usando Tankstak-Query */}
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="all"
                            onClick={() => setSearchParams((prev) => {
                                prev.set('tab', 'all');
                                prev.set('page', '1');
                                prev.set('category', 'all');
                                return prev;
                            })}
                        >All Characters ({summary?.totalHeroes})</TabsTrigger>
                        <TabsTrigger value="favorites" className="flex items-center gap-2"
                            onClick={() => setSearchParams((prev) => {
                                prev.set('tab', 'favorites');
                                return prev;
                            })}
                        >
                            Favorites ({favoriteCount})
                        </TabsTrigger>
                        <TabsTrigger value="heroes"
                            onClick={() => setSearchParams((prev) => {
                                prev.set('tab', 'heroes');
                                prev.set('page', '1');
                                prev.set('category', 'hero');
                                return prev;
                            })}
                        >Heroes ({summary?.heroCount})</TabsTrigger>
                        <TabsTrigger value="villains"
                            onClick={() => setSearchParams((prev) => {
                                prev.set('tab', 'villains');
                                prev.set('page', '1');
                                prev.set('category', 'Villain');
                                return prev;
                            })}
                        >Villains ({summary?.villainCount})</TabsTrigger>
                    </TabsList>

                    <TabsContent value='all'>
                        <HeroGrid heroProps={heroesResponse?.heroes ?? []} />
                    </TabsContent>
                    <TabsContent value='favorites'>
                        <HeroGrid heroProps={favorites} />
                    </TabsContent >
                    <TabsContent value='heroes'>
                        <HeroGrid heroProps={heroesResponse?.heroes ?? []} />
                    </TabsContent>
                    <TabsContent value='villains'>
                        <HeroGrid heroProps={heroesResponse?.heroes ?? []} />
                    </TabsContent>
                </Tabs>

                {/* Pagination */}
                {
                    selectedTab !== 'favorites' && (
                        <CustomPagination
                            totalPages={heroesResponse?.pages ?? 1}
                        />
                    )
                }
            </>
        </>
    )
}
