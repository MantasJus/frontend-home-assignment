/* Interface for country entity */
interface sharedCountry {
    capital: string[];
    region: string;
}
export interface Country extends sharedCountry {
    flag: string;
    countryName: string;
    languages: string[];
}

export interface CountryAPI extends sharedCountry{
    flags: {
        svg: string;
        png: string;
    };
    name: {
        common: string;
        official: string;
    }
    languages: {
        [key: string]: string;
    };
}