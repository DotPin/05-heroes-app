import type { Hero } from '../types/hero.interface';
import { HeroGridCard } from './HeroGridCard'

interface Props {
    heroProps?: Hero[];
}

export const HeroGrid = ({ heroProps }: Props) => {

    // console.log("HeroGrid");
    // console.log(heroProps);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {
                heroProps?.map((pj) => (
                    <HeroGridCard
                        hero={pj}
                        key={pj.id}
                        slug={pj.slug}
                        imageHero={pj.image}
                        heroName={pj.alias}
                        status={
                            pj.status == 'Active' ? true : false
                        }
                        favorite={true}
                        heroPj={pj.name}
                        typeHero={pj.category}
                        universe={pj.universe}
                        heroLeague={pj.team}
                        description={pj.description}
                        strength={pj.strength}
                        intelligence={pj.intelligence}
                        speed={pj.speed}
                        durability={pj.durability}
                        powers={pj.powers}
                        appeared={pj.firstAppearance}
                    />
                ))
            }


        </div>
    )
}
