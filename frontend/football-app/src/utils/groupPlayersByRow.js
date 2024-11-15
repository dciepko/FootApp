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

  Object.keys(rows).forEach((row) => {
    rows[row].sort((a, b) => a.col - b.col);
  });

  return rows;
}
