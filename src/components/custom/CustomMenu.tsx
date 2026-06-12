import { Link, useLocation } from "react-router"
import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    navigationMenuTriggerStyle,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
} from "../ui/navigation-menu";

export const CustomMenu = () => {

    const { pathname } = useLocation();

    const isActive = (path: string) => {
        return pathname === path;
    }

    return (
        <NavigationMenu className="py-5">
            <NavigationMenuList>
                {/* Home */}
                <NavigationMenuItem>
                    <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                        render={<Link to="/" >Inicio</Link>}>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Search */}
                <NavigationMenuItem>
                    <NavigationMenuLink
                        className={cn(isActive("/search") && "bg-slate-200 rounded-md", "p-2")}
                        render={<Link to="/search" >Buscar SuperHeroes</Link>}>
                    </NavigationMenuLink>
                </NavigationMenuItem>

            </NavigationMenuList>
        </NavigationMenu>
    )
}
