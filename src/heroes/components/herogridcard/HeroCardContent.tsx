import { Badge } from '@/components/ui/badge'
import { CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Brain, Gauge, Shield, Zap } from 'lucide-react'

interface Props {
    description: string
    strength: number;
    intelligence: number;
    speed: number;
    durability: number;
    powers: string[];
    appeared: string
}

export const HeroCardContent = ({ description = 'The Last Son of Krypton, protector of Earth and symbol of hope for all humanity.',
    strength = 100,
    intelligence = 80,
    speed = 90,
    durability = 100,
    powers = ['Super Strength', 'Flight', '+4 more'],
    appeared = '1983' }: Props) => {

    {/* Instructions */ }

    return (
        <CardContent className="space-y-4" >

            <p className="text-sm text-gray-600 line-clamp-2">
                {description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                    <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3 text-orange-500" />
                        <span className="text-xs font-medium">Strength</span>
                    </div>
                    <Progress value={strength * 10} className="h-2" activeColor="bg-orange-500" />
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-1">
                        <Brain className="h-3 w-3 text-blue-500" />
                        <span className="text-xs font-medium">Intelligence</span>
                    </div>
                    <Progress value={intelligence * 10} className="h-2" activeColor='bg-blue-500' />
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-1">
                        <Gauge className="h-3 w-3 text-green-500" />
                        <span className="text-xs font-medium">Speed</span>
                    </div>
                    <Progress value={speed * 10} className="h-2" activeColor='bg-green-500' />
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-1">
                        <Shield className="h-3 w-3 text-purple-500" />
                        <span className="text-xs font-medium">Durability</span>
                    </div>
                    <Progress value={durability * 10} className="h-2" activeColor='bg-purple-500' />
                </div>
            </div>

            {/* Powers */}
            <div className="space-y-2">
                <h4 className="font-medium text-sm">Powers:</h4>
                <div className="flex flex-wrap gap-1">
                    {
                        powers.map((pw) => (
                            <Badge variant="outline" className="text-xs" key={pw}>
                                {pw}
                            </Badge>

                        ))
                    }

                </div>
            </div>

            <div className="text-xs text-gray-500 pt-2 border-t">First appeared: {appeared}</div>
        </CardContent>
    )
}
