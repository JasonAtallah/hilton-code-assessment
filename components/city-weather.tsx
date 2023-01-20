/*
Deliverable 1 (bug):

Steps to reproduce
1. Navigate to homepage
2. Enter city in input and hit search

Expected result:
- Temperature and description of city render

Actual result:
- Page crashes

Cause:
- Homepage (index.tsx) renders CityWeather component if city is present. Even though we're fetching the cities weather results on componentDidMount, it's an asynchronous call and we need to ensure the call resolved and we have the weather results.

Mitigation:
- Ensuring weatherResult isn't undefined and has a temp prior to displaying the data is a quick fix.

Other changes:
- Typed props
- Fixed few typos

Note the component won't run as is because there is no API_KEY. I reverted that back. In the refactor I'll move the key to an envvar.
*/

// eslint-disable @typescript-eslint/no-use-before-define
import { Component } from "react";

// to get api key: https://openweathermap.org/appid
const API_KEY = "<insert your api key here>";

interface CityWeatherProps {
  city: string;
}

interface CityWeatherState {
  weatherResult: any;
}

export default class CityWeather extends Component<
  CityWeatherProps,
  CityWeatherState
> {
  public constructor(props: { city: string }) {
    super(props);
    this.state = {
      weatherResult: null,
    };
  }

  public componentDidMount() {
    const { city } = this.props;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    )
      .then((r) => r.json())
      .then((result) => this.setState({ weatherResult: result }));
  }

  public render() {
    const { city } = this.props;
    const { weatherResult } = this.state;

    // If we don't have weatherResults, inform the user we are loading the results
    if (!weatherResult) {
      return <h1 className="text-xl">Loading weather...</h1>;
    }

    // If we have a weatherResult but no temp then something broke on our end or the API
    if (!weatherResult?.main?.temp) {
      return <h1 className="text-xl">Something went wrong</h1>;
    }

    return (
      <div>
        <h1>{city}</h1>
        <div>
          Temperature: {KtoF(weatherResult.main.temp).toFixed(0)} &#8457;
        </div>
        {/* Typo fix */}
        <div>Description: {weatherResult.weather[0].description}</div>
      </div>
    );
  }
}

// Typo fix
function KtoF(tempKelvin: number) {
  // Typo fix
  return ((tempKelvin - 273.15) * 9) / 5 + 32;
}
