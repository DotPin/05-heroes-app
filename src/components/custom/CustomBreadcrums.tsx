import { Link } from 'react-router';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb'
import { SlashIcon } from 'lucide-react';

interface Breadcrumb {
    label: string;
    to: string;
}

interface Props {
    currentPage: string;
    breadcrumbs?: Breadcrumb[];
}

export const CustomBreadcrums = ({ currentPage, breadcrumbs = [] }: Props) => {
    return (
        <Breadcrumb className="my-5">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild
                    //render={<Link to='/' />}
                    >
                        <Link to='/' >Inicio</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                {
                    breadcrumbs.map((crumb, key) => (
                        <div className="flex items-center" key={key}>
                            <BreadcrumbSeparator>
                                <SlashIcon />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild
                                //render={<Link to={crumb.to} >{crumb.label}</Link>} 
                                >
                                    <Link to={crumb.to} >{crumb.label}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </div>
                    ))
                }


                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbLink >
                        {currentPage}
                    </BreadcrumbLink>
                </BreadcrumbItem>

            </BreadcrumbList>
        </Breadcrumb>
    )
}
