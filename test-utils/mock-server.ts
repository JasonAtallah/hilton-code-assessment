import { rest } from "msw";
import { setupServer } from "msw/node";
import { MOCK_RESULTS, TEMPERATURE_IN_KELVIN } from "./mock-results";

export const server = setupServer(
  rest.get("https://api.openweathermap.org/*", (req, res, ctx) => {
    return res(
      ctx.json({
        weather: [
          {
            description: MOCK_RESULTS.description,
            icon: MOCK_RESULTS.icon,
          },
        ],
        main: { temp: TEMPERATURE_IN_KELVIN },
      })
    );
  })
);
