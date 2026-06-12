import { Badge } from '@/components/ui/badge'
import { CardHeader } from '@/components/ui/card'

interface Props {
    heroName: string;
    heroPj: string;
    typeHero: string;
    heroLeague: string;
}

export const HeroCardHeader = ({ heroName, heroPj, heroLeague, typeHero }: Props) => {
    return (
        <CardHeader className="py-3 z-10 bg-gray-100/50 backdrop-blur-sm relative top-1 group-hover:top-[-10px] transition-all duration-300">
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <h3 className="font-bold text-lg leading-tight">{heroName}</h3>
                    <p className="text-sm text-gray-600">{heroPj}</p>
                </div>
                <Badge className="text-xs bg-green-100 text-green-800 border-green-200">{typeHero}</Badge>
            </div>
            <Badge variant="outline" className="w-fit text-xs">
                {heroLeague}
            </Badge>
        </CardHeader>
    )
}
