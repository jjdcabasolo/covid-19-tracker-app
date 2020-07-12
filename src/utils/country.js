import countries from '../constants/countries';

export function formatCountryName(text, isLowerCase = true) {
  const formattedText = text.replace(/-/g, ' ').trim();

  if (isLowerCase) return formattedText.toLowerCase();
  return formattedText;
}

export function getCountryCode(country) {
  const res = countries.find((e) => formatCountryName(e.name).includes(formatCountryName(country)));
  const { code } = res;

  return code;
}
