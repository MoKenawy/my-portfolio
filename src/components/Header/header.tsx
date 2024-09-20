import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import Link from "next/link";

type NavLink = {
    name: string;
    href?: string;
};


function Header({ links = [] }: { links?: NavLink[] }) {
    return (
        <Navbar className="flex w-full" maxWidth="full">
            <NavbarBrand>
                <img src="/logo.jpg" className="h-12 w-auto rounded-full" alt="logo" />
                <p className="font-bold text-inherit ml-2">Mohammed Kenawy</p>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-6" justify="center">
                {links.map(({ href, name }) => (
                    <NavbarItem key={name}>
                        {href ? (
                            <Link href={href}>
                                {name}
                            </Link>
                        ) : (
                            <span className="text-gray-600">
                                {name}
                            </span>
                        )}
                    </NavbarItem>
                ))}
            </NavbarContent>

            <NavbarContent justify={"end"} className="flex justify-end w-full">
                <Button color="primary" variant="bordered">
                    Say hello
                </Button>

            </NavbarContent>
        </Navbar>
    )
}


export default Header;


