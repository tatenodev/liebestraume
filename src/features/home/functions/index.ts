export const calculateProgressRate = (
  numerator: number,
  denominator: number,
) => {
  const result = (numerator / denominator) * 100;
  return result;
};
