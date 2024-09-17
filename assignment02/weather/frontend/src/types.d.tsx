export type LocationData = {
  city?: string;
  state?: string;
  latitude?: number;
  longitude?: number;
};

export type ReportData = {
  name: string;
  latitude: string;
  longitude: string;
  temperature: number;
  icon: string;
  humidity: number;
  windSpeed: number;
};
