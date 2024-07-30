import axios from "axios";

interface LocationDetails {
  ip: string;
  country: string;
  region: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  isp: string;
  org: string;
}

export async function getLocationDetails(): Promise<LocationDetails> {
  try {
    const response = await axios.get<LocationDetails>("http://ip-api.com/json");

    return response.data;
  } catch (error) {
    throw error;
  }
}

export const Url = {
  clientBaseURl: "https://scheduling.devtrust.biz",
};
