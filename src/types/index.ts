export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  origin: Airport;
  destination: Airport;
  departureTime: string;
  arrivalTime: string;
  duration: number; // in minutes
  price: number;
  class: FlightClass;
  availableSeats: number;
}

export interface FlightClass {
  type: 'economy' | 'premium-economy' | 'business' | 'first';
  name: string;
  price: number;
}

export interface FlightSearchRequest {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  isRoundTrip: boolean;
  class?: 'economy' | 'premium-economy' | 'business' | 'first';
}

export interface FlightSearchResponse {
  outboundFlights: Flight[];
  returnFlights?: Flight[];
  totalResults: number;
}

export type SortOption = 'price-asc' | 'price-desc' | 'duration-asc' | 'duration-desc';