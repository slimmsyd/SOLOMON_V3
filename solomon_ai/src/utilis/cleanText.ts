export const cleanText = (text: string): string => {
    // Replace all instances of "\n\n" with a single newline and remove any leading/trailing whitespace
    return text
      .replace(/\n\n/g, "\n")
      .replace(/^\s+|\s+$/g, "")
      .replace(/\s+/g, " ");
  };