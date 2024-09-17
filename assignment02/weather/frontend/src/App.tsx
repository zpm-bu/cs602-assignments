import { useState } from "react";

import "@mantine/core/styles.css";
import { AppShell, Container, MantineProvider, Title } from "@mantine/core";
import { theme } from "./theme";

import Head from "./Head.tsx";
import LocationForm from "./LocationForm.tsx";
import ReportsList from "./ReportsList.tsx";
import { LocationData, Backend } from "./types.d.tsx";

function App() {
  const [locationData, setLocationData] = useState<LocationData>({
    city: undefined,
    state: undefined,
    zip: undefined,
    latitude: undefined,
    longitude: undefined,
  });

  const [backend, setBackend] = useState<Backend>("node");

  return (
    <MantineProvider theme={theme}>
      <AppShell header={{ height: 60 }} padding="md">
        <AppShell.Header>
          {/* Head needs access to both parts of backend so it can set w/ the switch */}
          <Head backend={backend} setBackend={setBackend} />
        </AppShell.Header>
        <AppShell.Main>
          <Container size="md">
            {/* Use a little form to set the locationData */}
            <Title order={2}>Set location</Title>
            <LocationForm
              locationData={locationData}
              setLocationData={setLocationData}
            />
            {/* Displays for the data itself */}
            <Title order={2}>Reports</Title>
            <ReportsList
              locationData={locationData}
              setLocationData={setLocationData}
              withBackend={backend}
            />
          </Container>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
