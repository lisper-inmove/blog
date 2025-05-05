"use client";
import Catalog from "@/components/Catalog";
import Foot from "@/components/Foot";
import Nav from "@/components/Nav";
import { SearchContextProvider } from "@/contexts/SearchParamCtx";

export default function Home() {
    return (
        <SearchContextProvider>
            <div className="flex flex-col h-screen">
                <div>
                    <Nav showSearch={true} />
                </div>
                <div className="flex flex-grow mt-20 w-full">
                    <Catalog></Catalog>
                </div>
                <header className="text-white text-center">
                    <Foot></Foot>
                </header>
            </div>
        </SearchContextProvider>
    );
}
