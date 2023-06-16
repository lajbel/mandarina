import Text from "../components/Text";

export default function Home() {
    return (
        <main className="flex h-screen w-screen flex-col items-center px-2 py-2 lg:px-28 bg-[#fcc358]">
            <div className="flex w-full h-full flex-col p-2 bg-[#ffffff] rounded-lg">
                <Text size="huge" color="slate-900">
                    Mandarina
                </Text>
            </div>
        </main>
    );
}
