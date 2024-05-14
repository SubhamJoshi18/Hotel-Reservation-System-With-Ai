export const MinExceed = (input: any | number, actual: number) => {
  if (typeof input === "number" && typeof actual === "number") {
    return input < actual ? "Not Exceeded" : "Exceeded";
  }
};
