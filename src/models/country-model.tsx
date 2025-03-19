export interface CountryModel {
  name: {
    common: string;
    official: string;
  };
  population: number;
  region: string;
  flags: {
    png: string;
    alt: string;
    svg: string;
  };
}
