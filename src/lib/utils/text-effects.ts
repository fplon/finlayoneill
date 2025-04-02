export function scrambleText(text: string): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return text
    .split("")
    .map((char) =>
      Math.random() > 0.5
        ? characters[Math.floor(Math.random() * characters.length)]
        : char
    )
    .join("");
}
