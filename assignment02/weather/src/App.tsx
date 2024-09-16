import { useState } from "react";

import "@mantine/core/styles.css";
import { AppShell, MantineProvider } from "@mantine/core";
import { theme } from "./theme";

import Head from "./Head.tsx";
import { Coords, Backend } from "./types.d.tsx";

function App() {
  const [coords, setCoords] = useState<Coords>({
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
        <AppShell.Main></AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
