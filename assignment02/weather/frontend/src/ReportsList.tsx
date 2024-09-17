import { Stack } from "@mantine/core";

import Report from "./Report.tsx";

const EXAMPLE = [
  {
    coord: { lon: -71.0964, lat: 42.3499 },
    weather: [
      { id: 801, main: "Clouds", description: "few clouds", icon: "02d" },
    ],
    base: "stations",
    main: {
      temp: 289.43,
      feels_like: 289.39,
      temp_min: 287.33,
      temp_max: 290.61,
      pressure: 1025,
      humidity: 87,
      sea_level: 1025,
      grnd_level: 1020,
    },
    visibility: 10000,
    wind: { speed: 3.6, deg: 220 },
    clouds: { all: 20 },
    dt: 1726548634,
    sys: {
      type: 2,
      id: 2013408,
      country: "US",
      sunrise: 1726568817,
      sunset: 1726613439,
    },
    timezone: -14400,
    id: 4952349,
    name: "Boston MA",
    cod: 200,
  },
  {
    coord: {
      lon: -97.7454,
      lat: 30.268,
    },
    weather: [
      {
        id: 803,
        main: "Clouds",
        description: "broken clouds",
        icon: "04d",
      },
    ],
    base: "stations",
    main: {
      temp: 27.88,
      feels_like: 30.82,
      temp_min: 26.62,
      temp_max: 30.2,
      pressure: 1014,
      humidity: 73,
      sea_level: 1014,
      grnd_level: 990,
    },
    visibility: 10000,
    wind: {
      speed: 0.89,
      deg: 23,
      gust: 2.24,
    },
    clouds: {
      all: 75,
    },
    dt: 1726586173,
    sys: {
      type: 2,
      id: 2003218,
      country: "US",
      sunrise: 1726575413,
      sunset: 1726619631,
    },
    timezone: -18000,
    id: 4671654,
    name: "Austin TX",
    cod: 200,
  },
];

const items = EXAMPLE.map((item) => <Report {...item} />);

function ReportsList() {
  return <Stack gap="md">{items}</Stack>;
}

export default ReportsList;
//import { useState } from "react";
//import { Button, Group, Text } from "@mantine/core";
//import { LocationData, Backend } from "./types.d.tsx";
//
//type Props = {
//  locationData: LocationData;
//  setLocationData: Function;
//  withBackend: Backend;
//};
//
//type Report = {};
//
//function ReportsList(props: Props) {
//  const { locationData, setLocationData, withBackend: backend } = props;
//
//  const [reports, setReports] = useState<Array<Report>>([]);
//  const [isDisplayAll, setIsDisplayAll] = useState(false);
//
//  async function getCoords() {
//    const target = backend == "node" ? "https://localhost:3000" : "?";
//    const { city, state } = locationData;
//
//    const url = `${target}/coords?city=${city}&state=${state}`;
//    fetch(url)
//      .then((response) => response.json())
//      .then((json) => {
//        const { latitude, longitude } = json;
//        setLocationData({
//          ...locationData,
//          longitude: longitude,
//          latitude: latitude,
//        });
//      });
//  }
//
//  async function getReport() {
//    await getCoords();
//    const { latitude, longitude } = locationData;
//
//    const target = backend == "node" ? "https://localhost:3000" : "?";
//    const url = `${target}/report?latitude=${latitude}&longitude=${longitude}`;
//
//    fetch(url)
//      .then((response) => response.json())
//      .then((json) => {
//        const report = [];
//      });
//  }
//
//  function toggleShowAll() {
//    setIsDisplayAll(!isDisplayAll);
//  }
//
//  return (
//    <>
//      <Group>
//        <Button>Get report</Button>
//        <Button onClick={toggleShowAll}>
//          {isDisplayAll ? "Show only most recent" : "Show all reports"}
//        </Button>
//      </Group>
//      <Text>{locationData.latitude}</Text>
//    </>
//  );
//}
//
//export default ReportsList;
/* What do we need?
 *
 * reports :: list of all reports
 *
 * Button [Get report] :: On click, fetch a new report for the given location
 *   and prepend it to `reports`; `reports` is implicitly sorted
 *   newest->oldest
 *
 * Button [Show all] :: Switch whether the app is showing all or just one
 *
 * list :: If the app is showing just one, then display the first element in
 *   `reports`; if the app is showing all, show each report
 */
