export function countCharacters(text: string) {
  const characterCount = text.length;

  if (characterCount > 60) {
    return text.slice(0, 60) + "...";
  } else {
    return text;
  }
}
