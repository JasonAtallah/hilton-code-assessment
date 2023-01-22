import { render, screen } from "@testing-library/react";
import MainLayout from "./main-layout";
import Router from "next/router";
import { act } from "react-dom/test-utils";

type RouteEvent = Parameters<typeof Router.events.emit>[0];

const CONTENT_TEXT = "Some content";
const EVENTS_WITH_CONTENT = ["routeChangeComplete", "routeChangeError"];

const TestComponent = () => (
  <MainLayout>
    <h1 data-testid="content">{CONTENT_TEXT}</h1>
  </MainLayout>
);

describe("main layout loader", () => {
  beforeEach(() => render(<TestComponent />));

  test("It shows loader on routeChangeStart", () => {
    act(() => Router.events.emit("routeChangeStart"));
    const loaderEl = screen.getByTestId("loader");
    expect(loaderEl).toBeInTheDocument();
  });

  test.each(EVENTS_WITH_CONTENT)("It does not show loader on %s", (event) => {
    act(() => Router.events.emit(event as RouteEvent));
    const loaderEl = screen.queryAllByTestId("loader");
    expect(loaderEl.length).toBe(0);
  });
});

describe("main layout content", () => {
  beforeEach(() => render(<TestComponent />));

  test("It shows content", () => {
    const contentEl = screen.getByTestId("content");
    expect(contentEl).toBeInTheDocument();
    expect(contentEl).toHaveTextContent(CONTENT_TEXT);
  });

  test.each(EVENTS_WITH_CONTENT)("It shows content on %s", (event) => {
    act(() => Router.events.emit(event as RouteEvent));
    const contentEl = screen.getByTestId("content");
    expect(contentEl).toBeInTheDocument();
    expect(contentEl).toHaveTextContent(CONTENT_TEXT);
  });

  test("It does not show content on routeChangeStart", () => {
    act(() => Router.events.emit("routeChangeStart"));
    const contentEl = screen.queryAllByTestId("content");
    expect(contentEl.length).toBe(0);
  });
});
