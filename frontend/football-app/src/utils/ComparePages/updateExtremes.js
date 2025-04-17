export const updateExtremes = (
  stats,
  maxValues,
  minValues,
  excludedCategories
) => {
  const traverseAndUpdate = (data, maxObj, minObj) => {
    Object.entries(data).forEach(([key, value]) => {
      if (excludedCategories.includes(key)) return;

      if (typeof value === "number") {
        if (value > (maxObj[key] ?? -Infinity)) {
          maxObj[key] = value;
        }
        if (value < (minObj[key] ?? Infinity)) {
          minObj[key] = value;
        }
      } else if (typeof value === "object" && value !== null) {
        if (!maxObj[key]) maxObj[key] = {};
        if (!minObj[key]) minObj[key] = {};
        traverseAndUpdate(value, maxObj[key], minObj[key]);
      }
    });
  };

  traverseAndUpdate(stats, maxValues.current, minValues.current);
};
