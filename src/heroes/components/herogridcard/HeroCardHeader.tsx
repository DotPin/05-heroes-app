import { Badge } from '@/components/ui/badge'
import { CardHeader } from '@/components/ui/card'
import type { Hero } from '@/heroes/types/hero.interface';

interface Props {
    hero: Hero
}

export const HeroCardHeader = ({ hero }: Props) => {
    return (
        <CardHeader className="py-3 z-10 bg-gray-100/50 backdrop-blur-sm relative top-1 group-hover:top-[-10px] transition-all duration-300">
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <h3 className="font-bold text-lg leading-tight">{hero.alias}</h3>
                    <p className="text-sm text-gray-600">{hero.name}</p>
                </div>
                <Badge className="text-xs bg-green-100 text-green-800 border-green-200">{hero.category}</Badge>
            </div>
            <Badge variant="outline" className="w-fit text-xs">
                {hero.team}
            </Badge>
        </CardHeader>
    )
}
