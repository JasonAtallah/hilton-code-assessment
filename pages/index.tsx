import { InferGetServerSidePropsType, NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import CityWeather from "../components/city-weather-refactor";

const KtoF = (tempKelvin: number): number => {
  return ((tempKelvin - 273.15) * 9) / 5 + 32;
};

// I don't like using serverSideProps and almost never will but it will suffice in this situation.
// The flow of data and false sense of typesafety in serverSideProps are concerning.
export const getServerSideProps = async ({
  query,
}: {
  query: { city?: string };
}) => {
  // Using the router to find determine city.
  // I like this because it makes pages easier to share and bookmark.
  const city = String(query.city);

  const { OPEN_WEATHER_API_KEY } = process.env;
  const emptyProps = { props: {} };

  if (!OPEN_WEATHER_API_KEY) console.error("No API key for Open Weather found");
  if (!city || !OPEN_WEATHER_API_KEY) return emptyProps;

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}`
  );
  const data = await res.json();

  if (!data?.main?.temp) {
    console.error(`Failed to pull weather data from ${city}`);
    return emptyProps;
  }

  const { description, icon } = data.weather[0];

  return {
    props: {
      city,
      temperature: KtoF(data.main.temp).toFixed(0),
      description,
      icon,
    },
  };
};

const IndexPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const [city, setCity] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    router.push(`?city=${city}`);
  };

  return (
    <div className="flex flex-col items-center gap-12 p-8">
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <span className="text-lg self-center">Weather Search: </span>
        <div className="flex">
          <input
            type="text"
            id="city"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="bg-blue-450 text-white p-3 rounded-r-xl">
            SUBMIT
          </button>
        </div>
      </form>
      {props.city && <CityWeather {...props} />}
    </div>
  );
};

export default IndexPage;
