import { useState } from "react";
import CityWeather from "../components/city-weather-refactor";

function OldIndexPage() {
  const [city, setCity] = useState<string | null>(null);

  return (
    <div className="py-2">
      <form
        className="flex items-center justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          const formdata = new FormData(e.currentTarget);
          setCity(formdata.get("city").toString());
        }}
      >
        <span>Weather Search:</span>{" "}
        <input
          data-testid="weather-input"
          className="ml-2 border px-2 py-1 border-black"
          type="text"
          name="city"
        />
        <button className="ml-2 text-sm border rounded-lg p-2" type="submit">
          Submit
        </button>
      </form>

      <div className="mt-4">
        <CityWeather
          city={"Rohnert Park"}
          temperature={40}
          description={"clear sky"}
          iconCode="10d"
        />
      </div>
    </div>
  );
}

export default function IndexPage() {
  const [city, setCity] = useState("");

  return (
    <div className="flex flex-col items-center gap-12 p-8">
      <form className="flex gap-2">
        <span className="text-lg self-center">Weather Search: </span>
        <div className="flex">
          <input
            type="text"
            id="city"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          <button className="bg-blue-450 text-white p-3 rounded-r-xl">
            SUBMIT
          </button>
        </div>
      </form>
      <CityWeather
        city={"Rohnert Park"}
        temperature={40}
        description={"clear sky"}
        iconCode="10d"
      />
    </div>
  );
}
