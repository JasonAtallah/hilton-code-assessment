import { rest, setupWorker } from "msw";
import { setupServer } from "msw/node";
import { MOCK_RESULTS, TEMPERATURE_IN_KELVIN } from "./mock-results";

const IS_BROWSER = typeof window === undefined;

// Add any other http request mock handlers into this array
const handlers = [
  rest.get(`${process.env.OPEN_WEATHER_BASE_URL}/*`, (req, res, ctx) => {
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
  }),
];

export const getServer = () => setupServer(...handlers);
export const getWorker = () => setupWorker(...handlers);

export const setupMocks = async () =>
  IS_BROWSER ? getWorker().start() : getServer().listen();
