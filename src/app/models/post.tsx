export type Difficulty = "Hard" | "Medium" | "Easy";

export type PostMetadata = {
  id: string;
  title: string;
  keywords: string[];
  path: string;
  categories: string[];
  difficulty: Difficulty;
  subtitle: string;
};

export type PostsMetadataByCategory = {
  category: string;
  posts: PostMetadata[];
};

export type CategoryMap = {
  [categoryName: string]: PostMetadata[];
};
