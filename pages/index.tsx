import { InferGetServerSidePropsType, NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useRef, useState } from "react";
import CityWeather from "../components/city-weather-refactor";

const KtoF = (tempKelvin: number): number => {
  return ((tempKelvin - 273.15) * 9) / 5 + 32;
};

interface WeatherResult {
  city: string;
  temperature: string;
  description: string;
  icon: string;
}

const IndexPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const [city, setCity] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const focusInput = () => inputRef?.current?.focus();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    router.push(`?city=${city}`);
  };

  // Typesafety is muddy at best with serverSideProps, workaround needed here
  const weatherResults = props as WeatherResult;

  return (
    <div className="flex flex-col items-center gap-12 p-8">
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <label
          htmlFor="city"
          className="text-lg self-center"
          onClick={focusInput}
        >
          Weather Search:
        </label>
        <div className="flex">
          <input
            ref={inputRef}
            type="text"
            id="city"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={(e) => setCity(e.target.value)}
            aria-label="City Search"
          />
          <button className="bg-blue-450 text-white p-3 rounded-r-xl">
            SUBMIT
          </button>
        </div>
      </form>
      {weatherResults.city && <CityWeather {...weatherResults} />}
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
