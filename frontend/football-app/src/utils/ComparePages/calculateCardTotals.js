export const calculateCardTotals = (cards) => {
  const redTotal = Object.values(cards.red).reduce(
    (sum, period) => sum + (period.total || 0),
    0
  );
  const yellowTotal = Object.values(cards.yellow).reduce(
    (sum, period) => sum + (period.total || 0),
    0
  );
  return { redTotal, yellowTotal };
};
