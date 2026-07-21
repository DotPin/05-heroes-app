import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

export const CustomMenu = () => {
    const { pathname } = useLocation();

    const isActive = (path: string) => pathname === path;

    return (
        <NavigationMenu className="py-5">
            <NavigationMenuList>

                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link
                            to="/"
                            className={cn(
                                navigationMenuTriggerStyle(),
                                isActive("/") && "bg-slate-200"
                            )}
                        >
                            Inicio
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link
                            to="/search"
                            className={cn(
                                navigationMenuTriggerStyle(),
                                isActive("/search") && "bg-slate-200"
                            )}
                        >
                            Buscar SuperHeroes
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

            </NavigationMenuList>
        </NavigationMenu>
    );
};