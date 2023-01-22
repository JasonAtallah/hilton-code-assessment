import { KtoF } from "./temperature";

it("should convert Kelvin to Fahrenheit", () => {
  const tempKelvin = 273.15;
  const tempFahrenheit = KtoF(tempKelvin);
  expect(tempFahrenheit).toBe(32);
});
