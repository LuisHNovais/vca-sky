import { Airport } from '../types';
import { airports } from '../data/airports';

export class AirportService {
  private static instance: AirportService;
  
  public static getInstance(): AirportService {
    if (!AirportService.instance) {
      AirportService.instance = new AirportService();
    }
    return AirportService.instance;
  }

  public searchAirports(query: string): Airport[] {
    if (!query || query.length < 1) {
      return [];
    }

    const searchTerm = query.toLowerCase();
    
    return airports.filter(airport => 
      airport.code.toLowerCase().includes(searchTerm) ||
      airport.name.toLowerCase().includes(searchTerm) ||
      airport.city.toLowerCase().includes(searchTerm) ||
      airport.country.toLowerCase().includes(searchTerm)
    ).slice(0, 10); // Limit to 10 results for autocomplete
  }

  public getAirportByCode(code: string): Airport | undefined {
    return airports.find(airport => airport.code.toLowerCase() === code.toLowerCase());
  }

  public getAllAirports(): Airport[] {
    return [...airports];
  }

  public getPopularAirports(): Airport[] {
    // Return most popular Brazilian airports
    const popularCodes = ['GRU', 'GIG', 'BSB', 'CNF', 'SSA', 'REC', 'FOR', 'POA'];
    return airports.filter(airport => popularCodes.includes(airport.code));
  }
}