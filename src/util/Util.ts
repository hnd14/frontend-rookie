export default function formatTime(s: string) {
  return new Date(Date.parse(s)).toString();
}
