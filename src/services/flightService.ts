import { Flight, FlightSearchRequest, FlightSearchResponse, SortOption } from '../types';
import { mockFlights, generateFlightsForRoute } from '../data/flights';
import { AirportService } from './airportService';

export class FlightService {
  private static instance: FlightService;
  private airportService = AirportService.getInstance();
  
  public static getInstance(): FlightService {
    if (!FlightService.instance) {
      FlightService.instance = new FlightService();
    }
    return FlightService.instance;
  }

  public async searchFlights(request: FlightSearchRequest): Promise<FlightSearchResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const originAirport = this.airportService.getAirportByCode(request.origin);
    const destinationAirport = this.airportService.getAirportByCode(request.destination);

    if (!originAirport || !destinationAirport) {
      throw new Error('Aeroportos de origem ou destino não encontrados');
    }

    // Get outbound flights
    let outboundFlights = generateFlightsForRoute(
      originAirport.code,
      destinationAirport.code,
      request.departureDate
    );

    // Filter by class if specified
    if (request.class) {
      outboundFlights = outboundFlights.filter(flight => flight.class.type === request.class);
    }

    let returnFlights: Flight[] | undefined;
    
    // Get return flights if round trip
    if (request.isRoundTrip && request.returnDate) {
      returnFlights = generateFlightsForRoute(
        destinationAirport.code,
        originAirport.code,
        request.returnDate
      );

      if (request.class) {
        returnFlights = returnFlights.filter(flight => flight.class.type === request.class);
      }
    }

    return {
      outboundFlights,
      returnFlights,
      totalResults: outboundFlights.length + (returnFlights?.length || 0)
    };
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