import { Container, Title, Switch } from "@mantine/core";
import classes from "./head.module.css";

import { Backend } from "./types.d.tsx";

type Props = {
  backend: Backend;
  setBackend: Function;
};

function Head(props: Props) {
  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Title order={1}>Weather</Title>
        <Switch
          label={props.backend}
          labelPosition="left"
          onChange={() => {
            props.setBackend(props.backend == "node" ? "php" : "node");
          }}
        />
      </Container>
    </header>
  );
}

export default Head;
