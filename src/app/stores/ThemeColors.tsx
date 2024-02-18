export type ThemeColor = {
  commonBgColor: string;
  commonTextColor: string;
  reverseColor: string;
  themeToggleBgColor: string;
};

const commonDarkColor = "#6f6a6a";
const commonLightColor = "#f1f9ed";

export const darkModeColor: ThemeColor = {
  commonBgColor: commonDarkColor,
  commonTextColor: commonLightColor,
  reverseColor: commonLightColor,
  themeToggleBgColor: "#00aabb82",
};

export const lightModeColor: ThemeColor = {
  commonBgColor: commonLightColor,
  commonTextColor: commonDarkColor,
  reverseColor: commonDarkColor,
  themeToggleBgColor: "#00aabb82",
};
