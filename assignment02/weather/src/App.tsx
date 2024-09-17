import { useState } from "react";

import "@mantine/core/styles.css";
import { AppShell, MantineProvider } from "@mantine/core";
import { theme } from "./theme";

import Head from "./Head.tsx";
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
          {/* Use a little form to set the locationData */}
          <></>
          {/* Displays for the data itself */}
          <></>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
