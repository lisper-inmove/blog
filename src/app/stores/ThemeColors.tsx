export type ThemeColor = {
  commonBgColor: string;
  commonTextColor: string;
  navbarBgColor: string;
  reverseColor: string;
  themeToggleBgColor: string;
  postCategoryCardBgColor: string;
  postCategoryCardShadowColor1: string;
  postCategoryCardShadowColor2: string;
  headlineTextColor: string;
  tagTextColor: string;
  codeLanguageTextColor: string;
  resultsTextColor: string;
};

const commonDarkColor = "#6f6a6a";
const commonLightColor = "#dadada";

export const darkModeColor: ThemeColor = {
  commonBgColor: commonDarkColor,
  commonTextColor: commonLightColor,
  reverseColor: commonLightColor,
  themeToggleBgColor: "#00aabb82",
  postCategoryCardBgColor: "#b4bcc38c",
  postCategoryCardShadowColor1: "#313233fc",
  postCategoryCardShadowColor2: "#cad2d9",
  headlineTextColor: "#ffa900",
  tagTextColor: "#f380a0",
  codeLanguageTextColor: "#e67002",
  navbarBgColor: "#dadada00",
  resultsTextColor: "red",
};

export const lightModeColor: ThemeColor = {
  commonBgColor: commonLightColor,
  commonTextColor: commonDarkColor,
  reverseColor: commonDarkColor,
  themeToggleBgColor: "#00aabb82",
  postCategoryCardBgColor: "#dadadad9",
  postCategoryCardShadowColor1: "#8d8484d9",
  postCategoryCardShadowColor2: "#f1ececd9",
  headlineTextColor: "#b36a01",
  tagTextColor: "#f380a0",
  codeLanguageTextColor: "#e67002",
  navbarBgColor: "#dadada00",
  resultsTextColor: "red",
};
