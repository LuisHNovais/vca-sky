import { Flight, FlightClass } from '../types';
import { airports } from './airports';

const flightClasses: Record<string, FlightClass> = {
  economy: { type: 'economy', name: 'Econômica', price: 0 },
  'premium-economy': { type: 'premium-economy', name: 'Econômica Premium', price: 300 },
  business: { type: 'business', name: 'Executiva', price: 800 },
  first: { type: 'first', name: 'Primeira Classe', price: 1500 }
};

export const mockFlights: Flight[] = [
  // GRU -> GIG
  {
    id: '1',
    airline: 'TAM',
    flightNumber: 'JJ3021',
    origin: airports.find(a => a.code === 'GRU')!,
    destination: airports.find(a => a.code === 'GIG')!,
    departureTime: '08:00',
    arrivalTime: '09:30',
    duration: 90,
    price: 350,
    class: flightClasses.economy,
    availableSeats: 45
  },
  {
    id: '2',
    airline: 'GOL',
    flightNumber: 'G31045',
    origin: airports.find(a => a.code === 'GRU')!,
    destination: airports.find(a => a.code === 'GIG')!,
    departureTime: '10:15',
    arrivalTime: '11:45',
    duration: 90,
    price: 320,
    class: flightClasses.economy,
    availableSeats: 32
  },
  {
    id: '3',
    airline: 'AZUL',
    flightNumber: 'AD4578',
    origin: airports.find(a => a.code === 'GRU')!,
    destination: airports.find(a => a.code === 'GIG')!,
    departureTime: '14:30',
    arrivalTime: '16:00',
    duration: 90,
    price: 450,
    class: flightClasses['premium-economy'],
    availableSeats: 28
  },
  {
    id: '4',
    airline: 'TAM',
    flightNumber: 'JJ3045',
    origin: airports.find(a => a.code === 'GRU')!,
    destination: airports.find(a => a.code === 'GIG')!,
    departureTime: '18:20',
    arrivalTime: '19:50',
    duration: 90,
    price: 580,
    class: flightClasses.business,
    availableSeats: 12
  },

  // GIG -> GRU
  {
    id: '5',
    airline: 'GOL',
    flightNumber: 'G31046',
    origin: airports.find(a => a.code === 'GIG')!,
    destination: airports.find(a => a.code === 'GRU')!,
    departureTime: '07:45',
    arrivalTime: '09:15',
    duration: 90,
    price: 340,
    class: flightClasses.economy,
    availableSeats: 38
  },
  {
    id: '6',
    airline: 'AZUL',
    flightNumber: 'AD4579',
    origin: airports.find(a => a.code === 'GIG')!,
    destination: airports.find(a => a.code === 'GRU')!,
    departureTime: '12:00',
    arrivalTime: '13:30',
    duration: 90,
    price: 380,
    class: flightClasses.economy,
    availableSeats: 25
  },

  // BSB -> GRU
  {
    id: '7',
    airline: 'TAM',
    flightNumber: 'JJ3102',
    origin: airports.find(a => a.code === 'BSB')!,
    destination: airports.find(a => a.code === 'GRU')!,
    departureTime: '09:30',
    arrivalTime: '11:15',
    duration: 105,
    price: 420,
    class: flightClasses.economy,
    availableSeats: 42
  },
  {
    id: '8',
    airline: 'GOL',
    flightNumber: 'G31120',
    origin: airports.find(a => a.code === 'BSB')!,
    destination: airports.find(a => a.code === 'GRU')!,
    departureTime: '16:45',
    arrivalTime: '18:30',
    duration: 105,
    price: 390,
    class: flightClasses.economy,
    availableSeats: 35
  },

  // International flights
  {
    id: '9',
    airline: 'TAM',
    flightNumber: 'JJ8001',
    origin: airports.find(a => a.code === 'GRU')!,
    destination: airports.find(a => a.code === 'JFK')!,
    departureTime: '23:30',
    arrivalTime: '07:15+1',
    duration: 585,
    price: 2800,
    class: flightClasses.economy,
    availableSeats: 85
  },
  {
    id: '10',
    airline: 'American Airlines',
    flightNumber: 'AA963',
    origin: airports.find(a => a.code === 'GRU')!,
    destination: airports.find(a => a.code === 'MIA')!,
    departureTime: '01:15',
    arrivalTime: '07:45',
    duration: 510,
    price: 2400,
    class: flightClasses.economy,
    availableSeats: 76
  }
];

export function generateFlightsForRoute(originCode: string, destinationCode: string, date: string): Flight[] {
  const origin = airports.find(a => a.code === originCode);
  const destination = airports.find(a => a.code === destinationCode);
  
  if (!origin || !destination) return [];

  // Find existing flights for this route
  const existingFlights = mockFlights.filter(
    f => f.origin.code === originCode && f.destination.code === destinationCode
  );

  if (existingFlights.length > 0) {
    return existingFlights;
  }

  // Generate mock flights if no existing ones
  const airlines = ['TAM', 'GOL', 'AZUL', 'Avianca'];
  const generatedFlights: Flight[] = [];
  
  for (let i = 0; i < Math.random() * 6 + 3; i++) {
    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    const hour = Math.floor(Math.random() * 24);
    const minute = Math.floor(Math.random() * 4) * 15;
    const duration = Math.random() * 300 + 90; // 1.5h to 6.5h
    
    const classType = Object.keys(flightClasses)[Math.floor(Math.random() * Object.keys(flightClasses).length)];
    const basePrice = Math.random() * 1500 + 200;
    
    generatedFlights.push({
      id: `generated-${originCode}-${destinationCode}-${i}`,
      airline,
      flightNumber: `${airline.substring(0, 2).toUpperCase()}${Math.floor(Math.random() * 9000 + 1000)}`,
      origin,
      destination,
      departureTime: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
      arrivalTime: new Date(new Date().setHours(hour, minute, 0, 0) + duration * 60000)
        .toTimeString().substring(0, 5),
      duration: Math.floor(duration),
      price: Math.floor(basePrice + flightClasses[classType].price),
      class: flightClasses[classType],
      availableSeats: Math.floor(Math.random() * 100 + 10)
    });
  }
  
  return generatedFlights;
}