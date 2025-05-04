"use client";
import { LoadMetadataHttp } from "@/app/api/metadata/LoadMetadataHttp";
import { useSearchContext } from "@/contexts/SearchParamCtx";
import { PostMetadata } from "@/entities/Post";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import MotionCard from "./MotionCard";

export default function Catalog() {
    const [metadatas, setMetadatas] = useState<PostMetadata[]>([]);
    const { ref, inView } = useInView();
    const [isEnd, setIsEnd] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const { searchParam } = useSearchContext();

    const loadMore = async (curPage?: number) => {
        if (curPage === undefined) {
            curPage = page;
        }
        await LoadMetadataHttp({
            page: curPage,
            category: searchParam,
        }).then((response) => {
            if (response.length == 0) {
                setIsEnd(true);
                return;
            }
            if (curPage === 1) {
                setMetadatas(response);
            } else {
                setMetadatas((prev) => [...prev, ...response]);
            }
            setPage((prev) => prev + 1);
        });
    };

    useEffect(() => {
        setTimeout(() => {
            setPage(1);
            setIsEnd(false);
            loadMore(1);
        }, 500);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParam]);

    useEffect(() => {
        if (inView && !isEnd) {
            loadMore();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView, isEnd]);

    return (
        <div className="w-full">
            {metadatas.map((metadata) => {
                return (
                    <div key={metadata.id}>
                        <MotionCard metadata={metadata}></MotionCard>
                    </div>
                );
            })}
            <div ref={ref}></div>
        </div>
    );
}
