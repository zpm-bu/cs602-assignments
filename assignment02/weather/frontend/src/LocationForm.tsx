import { ChangeEvent } from "react";

import { Group, TextInput } from "@mantine/core";

import { LocationData } from "./types.d.tsx";

type Params = {
  locationData: LocationData;
  setLocationData: Function;
};

function LocationForm(params: Params) {
  const { locationData, setLocationData } = params;

  function handleChange(key: "city" | "state" | "zip") {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setLocationData({
        ...locationData,
        [key]: event.currentTarget.value,
      });
    };
  }

  return (
    <Group gap="md">
      <TextInput
        label="City"
        placeholder="Boston"
        onChange={handleChange("city")}
      />
      <TextInput
        label="State"
        placeholder="MA"
        onChange={handleChange("state")}
      />
      <TextInput
        label="ZIP Code"
        placeholder="02215"
        onChange={handleChange("zip")}
      />
    </Group>
  );
}

export default LocationForm;
