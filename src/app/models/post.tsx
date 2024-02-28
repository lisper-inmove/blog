export type Difficulty = "Hard" | "Medium" | "Easy";

export type PostMetadata = {
  id: string;
  title: string;
  keywords: string[];
  path: string;
  categories: string[];
  difficulty: Difficulty;
  subtitle: string;
  display: string;
  queryTime: string;
};

export type PostsMetadataByCategory = {
  category: string;
  posts: PostMetadata[];
};

export interface CategoryMap {
  [categoryName: string]: PostMetadata[];
}

export type PostProperty = {
  title: string;
  subtitle: string;
  createDate: Date;
  updateDate: Date;
  category: string;
  keywords: string;
};

export type PostHeadline = {
  name: string;
  level: number;
  tags: string[];
  prefix: string;
};
