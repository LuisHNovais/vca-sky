import { Flight, FlightSearchRequest, FlightSearchResponse, SortOption } from '../types';
import { AirportService } from './airportService';

export class FlightService {
  private static instance: FlightService;
  private airportService = AirportService.getInstance();
  private apiKey = process.env.VITE_SERPAPI_KEY || '';
  private baseUrl = 'https://serpapi.com/search';
  
  public static getInstance(): FlightService {
    if (!FlightService.instance) {
      FlightService.instance = new FlightService();
    }
    return FlightService.instance;
  }

  public async searchFlights(request: FlightSearchRequest): Promise<FlightSearchResponse> {
    if (!this.apiKey) {
      throw new Error('SerpApi key not configured. Please set VITE_SERPAPI_KEY environment variable.');
    }

    const originAirport = this.airportService.getAirportByCode(request.origin);
    const destinationAirport = this.airportService.getAirportByCode(request.destination);

    if (!originAirport || !destinationAirport) {
      throw new Error('Aeroportos de origem ou destino não encontrados');
    }

    try {
      const params = new URLSearchParams({
        engine: 'google_flights',
        api_key: this.apiKey,
        departure_id: request.origin,
        arrival_id: request.destination,
        outbound_date: request.departureDate,
        type: request.isRoundTrip ? '1' : '2',
        currency: 'BRL',
        gl: 'br',
        hl: 'pt'
      });

      if (request.returnDate && request.isRoundTrip) {
        params.append('return_date', request.returnDate);
      }

      if (request.class) {
        const classMap: Record<string, string> = {
          'economy': '1',
          'premium-economy': '2', 
          'business': '3',
          'first': '4'
        };
        params.append('travel_class', classMap[request.class] || '1');
      }

      const response = await fetch(`${this.baseUrl}?${params}`);
      
      if (!response.ok) {
        throw new Error(`SerpApi request failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      return this.transformSerpApiResponse(data);
    } catch (error) {
      console.error('Error searching flights:', error);
      throw new Error('Erro ao buscar voos. Tente novamente.');
    }
  }

  private transformSerpApiResponse(data: any): FlightSearchResponse {
    const outboundFlights = this.transformFlights(data.best_flights || [])
      .concat(this.transformFlights(data.other_flights || []));

    return {
      outboundFlights,
      returnFlights: undefined,
      totalResults: outboundFlights.length
    };
  }

  private transformFlights(serpApiFlights: any[]): Flight[] {
    return serpApiFlights.map((flight: any) => {
      const firstLeg = flight.flights?.[0];
      const lastLeg = flight.flights?.[flight.flights.length - 1];
      
      return {
        id: flight.flight_id || `${firstLeg?.flight_number}_${Date.now()}`,
        airline: {
          code: firstLeg?.airline_logo ? firstLeg.airline : 'XX',
          name: firstLeg?.airline || 'Unknown Airline',
          logo: firstLeg?.airline_logo || ''
        },
        flightNumber: firstLeg?.flight_number || 'XX000',
        aircraft: firstLeg?.airplane || 'Unknown',
        origin: {
          code: firstLeg?.departure_airport?.id || '',
          name: firstLeg?.departure_airport?.name || '',
          city: firstLeg?.departure_airport?.name || '',
          country: 'Brasil'
        },
        destination: {
          code: lastLeg?.arrival_airport?.id || '',
          name: lastLeg?.arrival_airport?.name || '',
          city: lastLeg?.arrival_airport?.name || '',
          country: 'Brasil'
        },
        departure: {
          time: firstLeg?.departure_airport?.time || '',
          date: firstLeg?.departure_airport?.date || ''
        },
        arrival: {
          time: lastLeg?.arrival_airport?.time || '',
          date: lastLeg?.arrival_airport?.date || ''
        },
        duration: flight.total_duration || 0,
        stops: (flight.flights?.length || 1) - 1,
        price: flight.price || 0,
        class: {
          type: 'economy',
          name: 'Econômica'
        },
        baggage: {
          carry: '1 bagagem de mão',
          checked: flight.extensions?.includes('baggage') ? '1 bagagem despachada' : 'Não inclusa'
        },
        amenities: [],
        bookingUrl: flight.booking_link || '',
        carbonEmissions: flight.carbon_emissions?.this_flight || 0
      } as Flight;
    });
  }

  public sortFlights(flights: Flight[], sortBy: SortOption): Flight[] {
    const sortedFlights = [...flights];

    switch (sortBy) {
      case 'price-asc':
        return sortedFlights.sort((a, b) => a.price - b.price);
      
      case 'price-desc':
        return sortedFlights.sort((a, b) => b.price - a.price);
      
      case 'duration-asc':
        return sortedFlights.sort((a, b) => a.duration - b.duration);
      
      case 'duration-desc':
        return sortedFlights.sort((a, b) => b.duration - a.duration);
      
      default:
        return sortedFlights;
    }
  }

  public formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins.toString().padStart(2, '0')}m`;
  }

  public formatPrice(price: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  }

  public getFlightClasses() {
    return [
      { value: 'economy', label: 'Econômica' },
      { value: 'premium-economy', label: 'Econômica Premium' },
      { value: 'business', label: 'Executiva' },
      { value: 'first', label: 'Primeira Classe' }
    ];
  }

  public getSortOptions() {
    return [
      { value: 'price-asc', label: 'Mais barato' },
      { value: 'price-desc', label: 'Mais caro' },
      { value: 'duration-asc', label: 'Mais rápido' },
      { value: 'duration-desc', label: 'Mais demorado' }
    ];
  }
}