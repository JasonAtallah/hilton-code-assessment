/**
 *
 * @param tempKelvin The temperature in Kelvin
 * @returns Temperature converted to fahrenheit
 */
export const KtoF = (tempKelvin: number): number => {
  return ((tempKelvin - 273.15) * 9) / 5 + 32;
};
