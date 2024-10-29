// utils.js
export function groupPlayersByRow(players) {
  const rows = {};

  players.forEach((playerData) => {
    const { player } = playerData;
    const [row, col] = player.grid.split(":").map(Number);

    if (!rows[row]) {
      rows[row] = [];
    }
    rows[row].push({ ...player, col });
  });

  // Sortujemy graczy w każdym wierszu na podstawie ich kolumn, aby byli umieszczeni we właściwej kolejności
  Object.keys(rows).forEach((row) => {
    rows[row].sort((a, b) => a.col - b.col);
  });

  return rows;
}
