export const uppercaseOrEmptyStr = (text: string): string => {
  try {
    return text.toUpperCase();
  } catch (error) {
    return "";
  }
};

export const title = (text: string): string => {
  return text
    .split(" ")
    .map(
      (word: string) =>
        word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
    )
    .join(" ");
};

export const titleOrEmptyStr = (text: string): string => {
  try {
    return title(text);
  } catch (error) {
    return "";
  }
};
