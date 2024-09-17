import { useEffect, useState } from "react";
import { Card, Group, Image, Text, Title } from "@mantine/core";

type Props = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  rain?: { "1h": number; "3h": number };
  snow?: { "1h": number; "3h": number };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

function Report(props: Props) {
  const [icon, setIcon] = useState("");

  // StackOverflow
  const fetchImage = async (imageURL: string) => {
    const res = await fetch(imageURL);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setIcon(imageObjectURL);
  };

  useEffect(() => {
    fetchImage(
      `https://openweathermap.org/img/wn/${props.weather[0].icon}@2x.png`,
    );
  }, []);
  // End StackOverflow

  return (
    <Card shadow="sm" padding="lg" withBorder>
      <Card.Section>
        <div
          style={{ backgroundColor: "#2bafff", width: "100%", height: "5rem" }}
        ></div>
      </Card.Section>
      <Group justify="space-between" mt="md">
        <Title order={4}>
          {Math.floor(props.main.temp)}°C {" " + props.name}
        </Title>
        <Image src={icon} w="50px" h="50px" />
      </Group>
      <Text size="sm" c="dimmed">
        {props.coord.lat}, {props.coord.lon}
      </Text>
    </Card>
  );
}

export default Report;
