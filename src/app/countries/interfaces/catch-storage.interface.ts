import { Country } from './country.interface';
import { Region } from './region.type';

export interface CacheStorage {
  byCapital: TermCountries;
  byCountry: TermCountries;
  byRegion: RegionCountries;
}

interface TermCountries {
  term: string;
  countries: Country[];
}

interface RegionCountries {
  term?: Region;
  countries: Country[];
}
