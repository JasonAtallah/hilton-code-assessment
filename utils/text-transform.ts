/**
 *
 * @param text Text you want to transform
 * @returns Text in all uppercase if possible. If not, will return an empty string
 */
export const uppercaseOrEmptyStr = (text: string): string => {
  try {
    return text.toUpperCase();
  } catch (error) {
    return "";
  }
};

/**
 *
 * @param text Text you want to convert to title case
 * @returns Text in title case
 */
export const title = (text: string): string => {
  return text
    .split(" ")
    .map(
      (word: string) =>
        word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
    )
    .join(" ");
};

/**
 *
 * @param text Text you want to convert to title case
 * @returns Text in title case if possible. If not, will return an empty string
 */
export const titleOrEmptyStr = (text: string): string => {
  try {
    return title(text);
  } catch (error) {
    return "";
  }
};
