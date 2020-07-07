export default function (text, isLowerCase = true) {
  const formattedText = text.replace(/-/g, ' ').trim();

  if (isLowerCase) return formattedText.toLowerCase();
  return formattedText;
}
