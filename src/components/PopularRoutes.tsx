import React from 'react';
import { Plane, Clock, MapPin } from 'lucide-react';

export interface Flight {
  id: string;
  origin: string;
  destination: string;
  originCode: string;
  destinationCode: string;
  price: number;
  duration: string;
  airline: string;
  departureTime: string;
  arrivalTime: string;
  date: string;
}

interface PopularRoutesProps {
  onSelectFlight: (flight: Flight) => void;
}

const popularFlights: Flight[] = [
  {
    id: '1',
    origin: 'São Paulo',
    destination: 'Rio de Janeiro',
    originCode: 'GRU',
    destinationCode: 'GIG',
    price: 299,
    duration: '1h 15m',
    airline: 'LATAM',
    departureTime: '08:30',
    arrivalTime: '09:45',
    date: '2025-02-15'
  },
  {
    id: '2',
    origin: 'São Paulo',
    destination: 'Salvador',
    originCode: 'GRU',
    destinationCode: 'SSA',
    price: 449,
    duration: '2h 20m',
    airline: 'GOL',
    departureTime: '14:20',
    arrivalTime: '16:40',
    date: '2025-02-16'
  },
  {
    id: '3',
    origin: 'Rio de Janeiro',
    destination: 'Brasília',
    originCode: 'GIG',
    destinationCode: 'BSB',
    price: 389,
    duration: '1h 50m',
    airline: 'Azul',
    departureTime: '11:15',
    arrivalTime: '13:05',
    date: '2025-02-17'
  },
  {
    id: '4',
    origin: 'São Paulo',
    destination: 'Fortaleza',
    originCode: 'GRU',
    destinationCode: 'FOR',
    price: 529,
    duration: '3h 10m',
    airline: 'LATAM',
    departureTime: '19:30',
    arrivalTime: '22:40',
    date: '2025-02-18'
  },
  {
    id: '5',
    origin: 'Belo Horizonte',
    destination: 'Porto Alegre',
    originCode: 'CNF',
    destinationCode: 'POA',
    price: 419,
    duration: '2h 05m',
    airline: 'GOL',
    departureTime: '16:45',
    arrivalTime: '18:50',
    date: '2025-02-19'
  },
  {
    id: '6',
    origin: 'Recife',
    destination: 'São Paulo',
    originCode: 'REC',
    destinationCode: 'GRU',
    price: 369,
    duration: '2h 45m',
    airline: 'Azul',
    departureTime: '07:00',
    arrivalTime: '09:45',
    date: '2025-02-20'
  }
];

export default function PopularRoutes({ onSelectFlight }: PopularRoutesProps) {
  return (
    <div className="max-w-6xl mx-auto mt-16">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
        Trechos Populares
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularFlights.map((flight) => (
          <div
            key={flight.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 cursor-pointer transform hover:-translate-y-1"
            onClick={() => onSelectFlight(flight)}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-2">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Plane className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-semibold text-gray-700">{flight.airline}</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">
                  R$ {flight.price}
                </div>
                <div className="text-sm text-gray-500">por pessoa</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">{flight.originCode}</span>
                  <span className="text-sm text-gray-600">{flight.origin}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{flight.destination}</span>
                  <span className="font-medium">{flight.destinationCode}</span>
                  <MapPin className="w-4 h-4 text-gray-400" />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{flight.departureTime}</span>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{flight.duration}</span>
                </div>
                <span>{flight.arrivalTime}</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <div className="text-sm text-gray-600">
                  Data: {new Date(flight.date).toLocaleDateString('pt-BR')}
                </div>
              </div>
            </div>

            <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
              Selecionar Voo
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}