export default function (text) {
  return text.replace(/-/g, ' ').trim().toLowerCase();
}
