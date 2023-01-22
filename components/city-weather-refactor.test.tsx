import { render, screen } from "@testing-library/react";
import { uppercaseOrEmptyStr } from "../utils/text-transform";
import CityWeather, { Props } from "./city-weather-refactor";

const props: Props = {
  city: "San Francisco",
  temperature: "0",
  description: "Broken Clouds",
  icon: "04d",
};

describe("city weather refactor", () => {
  beforeEach(() => {
    render(<CityWeather {...props} />);
  });

  test("It shows the city", () => {
    const el = screen.getByTestId("city");
    expect(el).toBeInTheDocument();
    expect(el).toHaveTextContent(uppercaseOrEmptyStr(props.city));
  });

  test("It shows the icon", () => {
    const el = screen.getByTestId("icon");
    expect(el).toBeInTheDocument();
  });

  test("It shows the description", () => {
    const el = screen.getByTestId("description");
    expect(el).toBeInTheDocument();
    expect(el).toHaveTextContent(props.description);
  });

  test("It shows the temperature", () => {
    const el = screen.getByTestId("temperature");
    expect(el).toBeInTheDocument();
    expect(el).toHaveTextContent(props.temperature);
  });
});
