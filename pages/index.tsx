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

  const { OPEN_WEATHER_API_KEY } = process.env;

  if (!OPEN_WEATHER_API_KEY)
    throw new Error("No API key for Open Weather found");
  if (!city) return emptyProps;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  if (!data?.main?.temp) {
    console.log(`Failed to pull weather data from ${city}`);
    return emptyProps;
  }

  const { description, icon } = data.weather[0];
  const temperature = KtoF(data.main.temp).toFixed(0);

  return { props: { city, temperature, description, icon } };
};
