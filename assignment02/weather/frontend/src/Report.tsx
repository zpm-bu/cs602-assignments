import { useState, useEffect } from "react";

import { Card, Group, Image, Text, Title } from "@mantine/core";

import { ReportData } from "./types.d.tsx";

const ICON_URL = `https://openweathermap.org/img/wn`;

function Report(props: ReportData) {
  const [icon, setIcon] = useState("");

  // stackoverflow
  const fetchIcon = async (url: string) => {
    const res = await fetch(url);
    const blob = await res.blob();
    const objectURL = URL.createObjectURL(blob);
    setIcon(objectURL);
  };

  useEffect(() => {
    fetchIcon(`${ICON_URL}/${props.icon}@2x.png`);
  }, []);
  // end stackoverflow

  return (
    <Card shadow="sm" padding="lg" withBorder>
      <Group justify="space-between">
        <Title order={4}>
          {props.temperature}°C {" " + props.name}
        </Title>
        <Image src={icon} w="50px" h="50px" />
      </Group>
      <Text size="sm" c="dimmed">
        {props.latitude}, {props.longitude}
      </Text>
      <Text mt="sm">
        <b>Humidity:</b> {props.humidity}%
      </Text>
      <Text>
        <b>Wind speed:</b> {props.windSpeed}
      </Text>
    </Card>
  );
}

export default Report;
