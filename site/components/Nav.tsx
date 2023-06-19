import * as React from "react";
import Text from "./Text";

interface NavProps {
    links: Record<string, string>;
}

const Nav: React.FC<NavProps> = (props) => {
    const { links } = props;

    return (
        <nav className="flex flex-row justify-center items-center">
            {Object.entries(links).map((link) => (
                <a
                    className="text-lg mx-2 hover:underline rounded-3xl p-2 bg-[#fcc358]"
                    href={link[1]}
                    key={link[0]}
                >
                    <Text color="zinc-50" bold>
                        {link[0]}
                    </Text>
                </a>
            ))}
        </nav>
    );
};

export default Nav;
