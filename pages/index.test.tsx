import "isomorphic-fetch";
import { NextRouter } from "next/router";
import IndexPage, { getServerSideProps, OptionalWeatherResult } from "./index";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../test-utils/mock-router";
import { MOCK_RESULTS } from "../test-utils/mock-results";
import { render, screen } from "@testing-library/react";
import { getServer } from "../test-utils/mock-server";

const createTestComponent = (
  router?: NextRouter,
  props?: OptionalWeatherResult
) => {
  const p = props ?? {};

  return (
    <RouterContext.Provider value={router || createMockRouter({})}>
      <IndexPage {...p} />
    </RouterContext.Provider>
  );
};

describe("IndexPage", () => {
  it("should render the form", () => {
    render(createTestComponent());
    const el = screen.getByTestId("form");
    expect(el).toBeInTheDocument();
  });

  it("should not render the weather card if there are not weather results", () => {
    render(createTestComponent());
    const el = screen.queryByTestId("city-weather");
    expect(el).not.toBeInTheDocument();
  });

  it("should render the city weather card if there are weather results", async () => {
    render(createTestComponent(createMockRouter({}), MOCK_RESULTS));
    const el = screen.getByTestId("city-weather");
    expect(el).toBeInTheDocument();
  });
});

const server = getServer();
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("getServerSideProps", () => {
  it("should return empty props when no city is provided", async () => {
    const result = await getServerSideProps({ query: { city: "" } });
    expect(result).toEqual({ props: {} });
  });

  it("should throw an error when no Open Weather API key is provided", async () => {
    const query = { city: MOCK_RESULTS.city };
    process.env.OPEN_WEATHER_API_KEY = "";

    await expect(getServerSideProps({ query })).rejects.toThrow(
      "Open Weather API not configured properly"
    );
  });

  it("should return weather data when a valid city and API key are provided", async () => {
    const query = { city: MOCK_RESULTS.city };
    process.env.OPEN_WEATHER_API_KEY = "valid_api_key";
    const result = await getServerSideProps({ query });
    expect(result).toEqual({ props: MOCK_RESULTS });
  });
});
