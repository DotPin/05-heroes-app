import { Badge } from '@/components/ui/badge'
import { CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import type { Hero } from '@/heroes/types/hero.interface'
import { Brain, Gauge, Shield, Zap } from 'lucide-react'

interface Props {
    hero: Hero,
}

export const HeroCardContent = ({ hero }: Props) => {

    {/* Instructions */ }

    return (
        <CardContent className="space-y-4" >

            <p className="text-sm text-gray-600 line-clamp-2">
                {hero.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                    <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3 text-orange-500" />
                        <span className="text-xs font-medium">Strength</span>
                    </div>
                    <Progress value={hero.strength * 10} className="h-2" activeColor="bg-orange-500" />
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-1">
                        <Brain className="h-3 w-3 text-blue-500" />
                        <span className="text-xs font-medium">Intelligence</span>
                    </div>
                    <Progress value={hero.intelligence * 10} className="h-2" activeColor='bg-blue-500' />
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-1">
                        <Gauge className="h-3 w-3 text-green-500" />
                        <span className="text-xs font-medium">Speed</span>
                    </div>
                    <Progress value={hero.speed * 10} className="h-2" activeColor='bg-green-500' />
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-1">
                        <Shield className="h-3 w-3 text-purple-500" />
                        <span className="text-xs font-medium">Durability</span>
                    </div>
                    <Progress value={hero.durability * 10} className="h-2" activeColor='bg-purple-500' />
                </div>
            </div>

            {/* Powers */}
            <div className="space-y-2">
                <h4 className="font-medium text-sm">Powers:</h4>
                <div className="flex flex-wrap gap-1">
                    {
                        hero.powers.map((pw) => (
                            <Badge variant="outline" className="text-xs" key={pw}>
                                {pw}
                            </Badge>

                        ))
                    }

                </div>
            </div>

            <div className="text-xs text-gray-500 pt-2 border-t">First appeared: {hero.firstAppearance}</div>
        </CardContent>
    )
}
