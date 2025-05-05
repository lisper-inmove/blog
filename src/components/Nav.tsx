"use client";
import { useSearchContext } from "@/contexts/SearchParamCtx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaGithub, FaHome } from "react-icons/fa";

interface NavBarProps {
    showSearch?: boolean;
    title?: string;
}

export default function Nav({
    showSearch = false,
    title = "Inmove",
}: NavBarProps) {
    const [inputValue, setInputValue] = useState("");
    const { setSearchParam } = useSearchContext();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearchParam(inputValue);
        }, 500);

        return () => clearTimeout(timeout);
    }, [inputValue, setSearchParam]);

    return (
        <div className=" bg-gray-100 dark:bg-gray-800 top-0 h-20 fixed w-full z-50">
            {/* Some Links section */}
            <div className="flex flex-row h-full w-full text-center items-center">
                <div className="flex flex-row pl-10">
                    <Link
                        href="https://github.com/lisper-inmove"
                        title="My GitHub"
                    >
                        <FaGithub className="h-6 w-6 mr-3" />
                    </Link>
                    <Link href="https://www.inmove.top" title="To Home">
                        <FaHome className="h-6 w-6" />
                    </Link>
                </div>
                <div className="flex-grow text-4xl brightness-90 rotate-0">
                    {title}
                </div>
                {showSearch && (
                    <div className="w-1/6 pr-10">
                        <input
                            type="text"
                            placeholder="Search by Category"
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
