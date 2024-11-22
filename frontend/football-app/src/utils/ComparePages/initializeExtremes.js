export const initializeExtremes = (stats, excludedCategories) => {
  const traverseAndInitialize = (data, maxObj, minObj) => {
    Object.entries(data).forEach(([key, value]) => {
      if (excludedCategories.includes(key)) return;
      if (typeof value === "number") {
        maxObj[key] = value;
        minObj[key] = value;
      } else if (typeof value === "object" && value !== null) {
        if (!maxObj[key]) maxObj[key] = {};
        if (!minObj[key]) minObj[key] = {};
        traverseAndInitialize(value, maxObj[key], minObj[key]);
      }
    });
  };

  traverseAndInitialize(stats, maxValues.current, minValues.current);
};
