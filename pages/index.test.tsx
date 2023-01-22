import "isomorphic-unfetch";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { NextRouter } from "next/router";
import IndexPage from "./index";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../test-utils/mock-router";
import { MOCK_RESULTS } from "../test-utils/mock-results";
import {
  fireEvent,
  queryByTestId,
  render,
  waitFor,
  screen,
} from "@testing-library/react";

const CITY = "San Francisco";

const server = setupServer(
  rest.get("./api", (req, res, ctx) => {
    console.log("is this runnign?");
    return res(ctx.json(MOCK_RESULTS));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const createTestComponent = (router?: NextRouter) => {
  return (
    <RouterContext.Provider value={router || createMockRouter({})}>
      <IndexPage />
    </RouterContext.Provider>
  );
};

describe("IndexPage", () => {
  it("should render the form", () => {
    render(createTestComponent());

    const el = screen.getByTestId("form");
    expect(el).toBeInTheDocument();
  });

  it("should not render the weather card if the city query param is not present", () => {});

  it("should render the weather card if the city query param is present", () => {});

  it("should query for weather results when a city query param is present");

  it("should show a loading screen while querying for weather results");
});
