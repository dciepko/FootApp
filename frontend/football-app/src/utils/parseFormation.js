export function parseFormation(formation) {
  return formation.split("-").map((num) => parseInt(num, 10));
}
