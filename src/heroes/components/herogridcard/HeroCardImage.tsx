import { use } from 'react';
import { useNavigate } from 'react-router';
import { Eye, Heart } from 'lucide-react'
import type { Hero } from '@/heroes/types/hero.interface';

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FavoriteHeroContext } from '@/heroes/context/FavoriteHeroContext';


interface Props {
    heroP: Hero;
    source: string;
    hero: string;
    slug: string;
    status: Boolean;
    universe: string;
    favorite: Boolean;
}

//TAREA: RESUMIR PROPS!!!!!!!!!!!!
export const HeroCardImage = ({ heroP, source, hero, slug, status, universe, favorite }: Props) => {


    const { isFavorite, toggleFavorite } = use(FavoriteHeroContext)

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/heroes/${slug}`);
    }

    return (
        <div className="relative h-64">
            <img
                src={source}
                alt={hero}
                className="object-cover transition-all duration-500 group-hover:scale-110 absolute top-[-30px] w-full h-[410px]"
                onClick={handleClick}
            />

            {/* Status indicator */}
            {
                status ? (
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <Badge variant="secondary" className="text-xs bg-white/90 text-gray-700">
                            Active
                        </Badge>
                    </div>
                ) : (
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-500" />
                        <Badge variant="secondary" className="text-xs bg-white/90 text-gray-700">
                            Off
                        </Badge>
                    </div>
                )
            }

            {/* Universe badge */}
            <Badge className="absolute top-3 right-3 text-xs bg-blue-600 text-white">{universe}</Badge>

            {/* Favorite button */}
            <Button
                size="sm"
                variant="ghost"
                className="absolute bottom-3 right-3 bg-white/90 hover:bg-white"
                onClick={() => toggleFavorite(heroP)}
            >
                {
                    isFavorite(heroP) ? (
                        <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    ) : (
                        <Heart className="h-4 w-4 text-gray-500" />
                    )
                }
            </Button>

            {/* View details button */}
            <Button
                size="sm"
                variant="ghost"
                className="absolute bottom-3 left-3 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <Eye className="h-4 w-4 text-gray-600" />
            </Button>
        </div>
    )
}
