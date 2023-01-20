# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- .eslintrc.json
- Custom color to [Tailwind Config](tailwind.config.js) (this was needed because the background in [design.png](design.png) was not a tailwind color)
- [Layout](components/main-layout.tsx) for app

### Security

- Moved Open Weather API key to .env

### Fixed

- [CityWeather](components/city-weather.tsx) component crashing application after submitting form
- Typos in [CityWeather](components/city-weather.tsx) component
