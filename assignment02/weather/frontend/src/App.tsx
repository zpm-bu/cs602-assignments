import { ChangeEvent, useState } from "react";
import {
  AppShell,
  Container,
  Group,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import "@mantine/core/styles.css";
import classes from "./head.module.css";
import { LocationData } from "./types.d.tsx";

function App() {
  const [location, setLocation] = useState<LocationData>({});

  function handleFieldChange(key: "city" | "state") {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setLocation({
        ...location,
        [key]: event.currentTarget.value,
      });
    };
  }

  async function getCoords() {
    const url = `http://localhost:3000/coords?city=${location.city}&state=${location.state}`;
    if (location.city && location.state) {
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          setLocation({
            ...location,
            latitude: json.latitude,
            longitude: json.longitude,
          });
        });
    }
  }

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <header className={classes.header}>
          <Container size="md" className={classes.inner}>
            <Title order={1}>Weather</Title>
          </Container>
        </header>
      </AppShell.Header>
      <AppShell.Main>
        <Container size="md">
          <Title order={2}>Location</Title>
          <Group gap="md">
            <TextInput
              label="City"
              placeholder="Boston"
              onChange={handleFieldChange("city")}
              onBlur={getCoords}
            />
            <TextInput
              label="State"
              placeholder="MA"
              onChange={handleFieldChange("state")}
              onBlur={getCoords}
            />
            <Text>
              {location.latitude}, {location.longitude}
            </Text>
          </Group>
          <Title order={2}>Reports</Title>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
