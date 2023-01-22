import { fireEvent, render, screen } from "@testing-library/react";
import { MOCK_RESULTS } from "../test-utils/mock-results";
import Form from "./form";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../test-utils/mock-router";
import { NextRouter } from "next/router";

const createTestComponent = (router?: NextRouter) => {
  return (
    <RouterContext.Provider value={router || createMockRouter({})}>
      <Form />
    </RouterContext.Provider>
  );
};

describe("Form component", () => {
  test("should show search bar", async () => {
    render(createTestComponent());

    const weatherSearchLabelEl = screen.getByTestId("weather-search-label");
    expect(weatherSearchLabelEl).toBeInTheDocument();
    expect(weatherSearchLabelEl).toHaveTextContent("Weather Search:");

    const weatherSearchInputEl = screen.getByTestId("weather-search-input");
    expect(weatherSearchInputEl).toBeInTheDocument();

    const buttonEl = screen.getByTestId("submit-btn");
    expect(buttonEl).toBeInTheDocument();
    expect(buttonEl).toHaveTextContent("SUBMIT");
  });

  test("should focus search bar when label is clicked", () => {
    render(createTestComponent());

    const labelEl = screen.getByTestId("weather-search-label");
    const searchInputEl = screen.getByTestId("weather-search-input");

    expect(searchInputEl).not.toHaveFocus();
    fireEvent.click(labelEl);
    expect(searchInputEl).toHaveFocus();
  });

  test("should route to city page when button is clicked", () => {
    const router = createMockRouter({});
    render(createTestComponent(router));

    const { city } = MOCK_RESULTS;

    const searchInputEl = screen.getByTestId(
      "weather-search-input"
    ) as HTMLInputElement;

    fireEvent.change(searchInputEl, {
      target: { value: city },
    });
    expect(searchInputEl.value).toBe(city);

    const buttonEl = screen.getByTestId("submit-btn") as HTMLButtonElement;
    fireEvent.click(buttonEl);
    expect(router.push).toHaveBeenCalledWith(`?city=${city}`);
  });
});
