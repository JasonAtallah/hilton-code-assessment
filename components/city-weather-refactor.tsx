/*
Not sure if I was supposed to keep the API call in the CityWeather component but
during the refactor I moved it to the page level. Making this a dumb and functional 
component makes it much easier to test and ensure it is working properly.
*/

import Image from "next/image";
import { titleOrEmptyStr, uppercaseOrEmptyStr } from "../utils/text-transform";

export interface Props {
  city: string;
  temperature: string;
  description: string;
  icon: string;
}

const CityWeather = ({ city, temperature, description, icon }: Props) => (
  <div
    data-testid="city-weather"
    className="bg-white flex flex-col items-center w-60 rounded-xl p-4 shadow-md"
  >
    <h3 data-testid="city" className="text-xl font-bold text-gray-650">
      {uppercaseOrEmptyStr(city)}
    </h3>

    <Image
      data-testid="icon"
      src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
      alt="Weather description image"
      width={128}
      height={128}
    />

    <h6 data-testid="description" className="text-neutral-450">
      {titleOrEmptyStr(description)}
    </h6>

    <span className="flex gap-3 items-end text-neutral-450 text-sm mt-2">
      Temperature:
      <span data-testid="temperature" className="text-3xl text-black">
        {temperature}&#8457;
      </span>
    </span>
  </div>
);

export default CityWeather;
