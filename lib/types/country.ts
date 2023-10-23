export interface Country {
  id: number;
  abbreviation: string;
  title: string;
  internationalCountryCallingCode: string;
  stateTitle: string;
  zipCodeTitle: string;
  systemTextNumberId: string;
  abbreviation2Digit: string;
}

export interface State {
  id: number;
  abbreviation: string;
  title: string;
  countryId: number;
}
