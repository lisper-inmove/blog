export type ThemeColor = {
  commonBgColor: string;
  commonTextColor: string;
  reverseColor: string;
  themeToggleBgColor: string;
  postCategoryCardBgColor: string;
  postCategoryCardShadowColor1: string;
  postCategoryCardShadowColor2: string;
};

const commonDarkColor = "#6f6a6a";
const commonLightColor = "#dadadad9";

export const darkModeColor: ThemeColor = {
  commonBgColor: commonDarkColor,
  commonTextColor: commonLightColor,
  reverseColor: commonLightColor,
  themeToggleBgColor: "#00aabb82",
  postCategoryCardBgColor: "#b4bcc38c",
  postCategoryCardShadowColor1: "#313233fc",
  postCategoryCardShadowColor2: "#cad2d9",
};

export const lightModeColor: ThemeColor = {
  commonBgColor: commonLightColor,
  commonTextColor: commonDarkColor,
  reverseColor: commonDarkColor,
  themeToggleBgColor: "#00aabb82",
  postCategoryCardBgColor: "#dadadad9",
  postCategoryCardShadowColor1: "#8d8484d9",
  postCategoryCardShadowColor2: "#f1ececd9",
};
