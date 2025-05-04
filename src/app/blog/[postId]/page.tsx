"use client";
import { loadPostHttp } from "@/app/api/post/[post]/LoadPostHttp";
import OrgModeViewer from "@/components/OrgModeViewer";
import { Dict } from "@/entities/Dict";
import { useEffect, useState } from "react";

export default function Post({
    params,
}: {
    params: Promise<{ postId: string }>;
}) {
    const [content, setContent] = useState<Dict | null>(null);
    const [loading, setLoading] = useState(true);
    const [postId, setPostId] = useState<string | null>(null);

    // Use useEffect to handle the async call once params are resolved
    useEffect(() => {
        const getPostContent = async () => {
            const { postId } = await params;
            setPostId(postId);
            const content = await loadPostHttp(postId);
            setContent(content);
            setLoading(false);
        };
        getPostContent();
    }, [params]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return <OrgModeViewer content={content || {}}></OrgModeViewer>;
}
