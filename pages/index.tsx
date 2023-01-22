import { InferGetServerSidePropsType, NextPage } from "next";
import { useMemo } from "react";
import CityWeather from "../components/city-weather-refactor";
import Form from "../components/form";
import { KtoF } from "../utils/temperature";

export interface WeatherResult {
  city: string;
  temperature: string;
  description: string;
  icon: string;
}

export type OptionalWeatherResult = WeatherResult | undefined;

const IndexPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const weatherResults = useMemo(() => props as OptionalWeatherResult, [props]);

  return (
    <div className="flex flex-col items-center gap-12 p-8">
      <Form />
      {weatherResults?.city && <CityWeather {...weatherResults} />}
    </div>
  );
};

export default IndexPage;

// I don't like using getServerSideProps and almost never will but it will suffice in this situation.
// The flow of data and false sense of typesafety in getServerSideProps are concerning.
export const getServerSideProps = async ({
  query,
}: {
  query: { city?: string };
}) => {
  const emptyProps = { props: {} };
  // Using the router to determine city. Makes pages easier to share and bookmark.
  const city = String(query.city);

  const { OPEN_WEATHER_API_KEY, OPEN_WEATHER_BASE_URL } = process.env;

  if (!OPEN_WEATHER_API_KEY || !OPEN_WEATHER_BASE_URL)
    throw new Error("Open Weather API not configured properly");

  if (!city) return emptyProps;

  try {
    const url = `${OPEN_WEATHER_BASE_URL}/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    const { description, icon } = data.weather[0];
    const temperature = KtoF(data.main.temp).toFixed(0);

    return { props: { city, temperature, description, icon } };
  } catch (error) {
    // Could do more validation based off of errors Open Weather throws but a catch all, silent fail does the job
    return emptyProps;
  }
};
