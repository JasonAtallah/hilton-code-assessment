import { render, screen } from "@testing-library/react";
import { MOCK_RESULTS } from "../test-utils/mock-results";
import { uppercaseOrEmptyStr } from "../utils/text-transform";
import CityWeather, { Props } from "./city-weather-refactor";

describe("CityWeather component", () => {
  beforeEach(() => {
    render(<CityWeather {...MOCK_RESULTS} />);
  });

  test("should show the city", () => {
    const el = screen.getByTestId("city");
    expect(el).toBeInTheDocument();
    expect(el).toHaveTextContent(uppercaseOrEmptyStr(MOCK_RESULTS.city));
  });

  test("should show the icon", () => {
    const el = screen.getByTestId("icon");
    expect(el).toBeInTheDocument();
  });

  test("should show the description", () => {
    const el = screen.getByTestId("description");
    expect(el).toBeInTheDocument();
    expect(el).toHaveTextContent(MOCK_RESULTS.description);
  });

  test("should show the temperature", () => {
    const el = screen.getByTestId("temperature");
    expect(el).toBeInTheDocument();
    expect(el).toHaveTextContent(MOCK_RESULTS.temperature);
  });
});
