import { use } from 'react';
import type { Hero } from '../types/hero.interface';

import { Card } from '@/components/ui/card'
import { HeroCardImage } from './herogridcard/HeroCardImage'
import { HeroCardHeader } from './herogridcard/HeroCardHeader'
import { HeroCardContent } from './herogridcard/HeroCardContent'
import { FavoriteHeroContext } from '../context/FavoriteHeroContext';

interface Props {
    hero: Hero;
    key: string;
    slug: string;
    imageHero: string;
    heroName: string;
    status: Boolean;
    favorite: Boolean;
    heroPj: string;
    typeHero: string;
    universe: string;
    heroLeague: string;
    description: string;
    strength: number;
    intelligence: number;
    speed: number;
    durability: number;
    powers: string[];
    appeared: string
}

//TAREA! RESUMIR PROPS!!!!!!!!
export const HeroGridCard = ({ hero, slug, imageHero,
    heroName,
    status,
    favorite,
    heroPj,
    typeHero,
    universe,
    heroLeague,
    description,
    strength,
    intelligence,
    speed,
    durability,
    powers,
    appeared }: Props) => {
    return (
        <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50">

            {/* Front Image */}
            <HeroCardImage
                heroP={hero}
                source={imageHero}
                hero={heroName}
                slug={slug}
                status={status}
                universe={universe}
                favorite={favorite}
            />

            {/*Header */}
            <HeroCardHeader
                heroName={heroName}
                heroPj={heroPj}
                heroLeague={heroLeague}
                typeHero={typeHero}
            />

            {/*Content */}
            <HeroCardContent
                key={slug}
                description={description}
                strength={strength}
                intelligence={intelligence}
                speed={speed}
                durability={durability}
                powers={powers}
                appeared={appeared}
            />
        </Card>
    )
}
