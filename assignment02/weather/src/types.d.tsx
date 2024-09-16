export type Coords = {
  latitude: number | undefined;
  longitude: number | undefined;
};

export type Backend = "php" | "node";

export function flipBackend(current: Backend): Backend {
  return current === "node" ? "php" : "node";
}
