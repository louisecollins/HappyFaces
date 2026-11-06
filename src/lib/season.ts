// Seasonal homepage switch.
// Christmas mode runs automatically from 1 November to 26 December.
// To preview or force it, add ?season=christmas (or ?season=off) to the page address.
export function isChristmasSeason(now: Date = new Date()): boolean {
  if (typeof window !== "undefined") {
    const forced = new URLSearchParams(window.location.search).get("season");
    if (forced === "christmas") return true;
    if (forced === "off") return false;
  }
  const month = now.getMonth(); // 0 = January
  const day = now.getDate();
  return month === 10 || (month === 11 && day <= 26);
}
