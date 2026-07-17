import type { Hero } from '../types/hero.interface';
import { Card } from '@/components/ui/card'
import { HeroCardImage } from './herogridcard/HeroCardImage'
import { HeroCardHeader } from './herogridcard/HeroCardHeader'
import { HeroCardContent } from './herogridcard/HeroCardContent'

interface Props {
    hero: Hero;
}

export const HeroGridCard = ({ hero }: Props) => {
    return (
        <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50">

            {/* Front Image */}
            <HeroCardImage
                hero={hero}
            />

            {/*Header */}
            <HeroCardHeader
                hero={hero}
            />

            {/*Content */}
            <HeroCardContent
                key={hero.slug}
                hero={hero}
            />
        </Card>
    )
}
