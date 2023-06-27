import Text from "components/Text";
import Nav from "components/Nav";

export default function Home() {
    return (
        <main className="flex h-screen w-screen flex-col items-center px-2 py-2 lg:px-28 bg-[#fcc358]">
            <div className="flex flex-row w-full h-full p-2 bg-[#ffffff] rounded-lg">
                <div className="inline-flex w-1/2 h-auto flex-col p-2 mt-2">
                    <Text size="huge" color="slate-900" bold>
                        Mandarina
                    </Text>

                    <Text size="normal" color="slate-900">
                        Mandarina is a visual novel engine for the web.
                    </Text>
                </div>

                <div className="inline-flex w-full h-auto flex-col p-2 mt-2">
                    <Nav
                        links={{
                            Home: "/",
                            Documentation: "/doc",
                            Example: "/example/index.html",
                        }}
                    ></Nav>
                </div>
            </div>
        </main>
    );
}
