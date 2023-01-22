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

    const labelEl = screen.getByTestId("weather-search-label");
    expect(labelEl).toBeInTheDocument();
    expect(labelEl).toHaveTextContent("Weather Search:");

    const inputEl = screen.getByTestId("weather-search-input");
    expect(inputEl).toBeInTheDocument();

    const buttonEl = screen.getByTestId("submit-btn");
    expect(buttonEl).toBeInTheDocument();
    expect(buttonEl).toHaveTextContent("SUBMIT");
  });

  test("should focus search bar when label is clicked", () => {
    render(createTestComponent());

    const labelEl = screen.getByTestId("weather-search-label");
    const inputEl = screen.getByTestId("weather-search-input");

    expect(inputEl).not.toHaveFocus();
    fireEvent.click(labelEl);
    expect(inputEl).toHaveFocus();
  });

  test("should route to city page when button is clicked", () => {
    const router = createMockRouter({});
    render(createTestComponent(router));

    const { city } = MOCK_RESULTS;

    const inputEl = screen.getByTestId(
      "weather-search-input"
    ) as HTMLInputElement;

    fireEvent.change(inputEl, {
      target: { value: city },
    });
    expect(inputEl.value).toBe(city);

    const buttonEl = screen.getByTestId("submit-btn") as HTMLButtonElement;
    fireEvent.click(buttonEl);
    expect(router.push).toHaveBeenCalledWith(`?city=${city}`);
  });
});
