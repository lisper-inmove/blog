export type PostMetadata = {
    path: string;
    id: string;
    title: string;
    categories: string[];
    date: string;
    keywords: string[];
    difficulty: string;
    subtitle: string;
    display: string;
    transship: string;
    cardimage: string;
    sort: number;
};

export type SourcePostMetadata = {
    path: string;
    id: string;
    title: string;
    categories: string;
    date: string;
    keywords: string;
    difficulty: string;
    subtitle: string;
    display: string;
    transship: string;
    cardimage: string;
    sort: number;
};

export type PostHeadline = {
    name: string;
    level: number;
    tags: string[];
    prefix: string;
};

export type PostProperty = {
    author: string;
    categories: string;
    date: string;
    display: string;
    keywords: string;
    options: string;
    startup: string;
    subtitle: string;
    title: string;
};
