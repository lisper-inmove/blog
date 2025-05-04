"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { PostMetadata } from "../entities/Post";

export const MotionDiv = motion.div;

interface Props {
    metadata: PostMetadata;
}

export default function MotionCard({ metadata }: Props) {
    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };
    return (
        <MotionDiv
            key={metadata.id}
            className="flex items-center justify-around w-4/5 mx-auto h-full neu-shadow rounded-2xl mt-10"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{
                delay: 0.1,
                ease: "easeInOut",
                duration: 0.5,
            }}
            viewport={{ amount: 0 }}
        >
            <div className="flex flex-col p-8 w-full h-64 justify-between">
                {/* 标题 */}
                <div className="text-2xl text-black dark:text-white font-bold">
                    <Link href={`/blog/${metadata.id}`} target="_blank">
                        {metadata.title}
                    </Link>
                </div>
                {/* 子标题 */}
                <div className="text-lg text-black/50 dark:text-gray-400 font-semibold indent-4">
                    {metadata.subtitle}
                </div>
                <div className="flex flex-row justify-between">
                    {/* 关键字 */}
                    <div className="flex flex-row mb-3">
                        <div className="text-black/70 dark:text-gray-700 text-lg mt-5 ml-3 px-3 py-1 bg-gray-300 rounded-lg font-semibold">
                            #{metadata.categories}
                        </div>
                        {metadata.keywords.map((keyword, index) => {
                            return (
                                <div
                                    className="text-black/70 dark:text-gray-800 text-lg mt-5 ml-3 px-3 py-1 bg-gray-300 rounded-lg font-semibold"
                                    key={`${metadata.id}-keyword-${index}`}
                                >
                                    #{keyword}
                                </div>
                            );
                        })}
                    </div>
                    {/* 创建时间 */}
                    <div className="self-end mb-3 text-black/35 dark:text-white/35">
                        {metadata.date}
                    </div>
                </div>
            </div>
        </MotionDiv>
    );
}
