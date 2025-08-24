import React, { useState } from 'react';
import { Plane, Clock, ArrowRight, Filter } from 'lucide-react';
import { Flight, SortOption } from '../types';
import { FlightService } from '../services/flightService';

interface FlightResultsProps {
  flights: Flight[];
  onFlightSelect: (flight: Flight) => void;
  loading?: boolean;
}

export default function FlightResults({ flights, onFlightSelect, loading = false }: FlightResultsProps) {
  const [sortBy, setSortBy] = useState<SortOption>('price-asc');
  const flightService = FlightService.getInstance();
  
  const sortedFlights = flightService.sortFlights(flights, sortBy);
  const sortOptions = flightService.getSortOptions();

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-6xl mx-auto mt-8">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-6 mb-4">
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (flights.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-6xl mx-auto mt-8 text-center">
        <Plane className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Nenhum voo encontrado
        </h3>
        <p className="text-gray-600">
          Tente ajustar suas preferências de busca
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-6xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {flights.length} voos encontrados
        </h2>
        
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {sortedFlights.map((flight) => (
          <div
            key={flight.id}
            className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer"
            onClick={() => onFlightSelect(flight)}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {flight.departureTime}
                  </div>
                  <div className="text-sm text-gray-600">
                    {flight.origin.code}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-500">
                  <div className="text-sm">
                    {flightService.formatDuration(flight.duration)}
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {flight.arrivalTime}
                  </div>
                  <div className="text-sm text-gray-600">
                    {flight.destination.code}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">
                  {flightService.formatPrice(flight.price)}
                </div>
                <div className="text-sm text-gray-600">
                  {flight.class.name}
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <Plane className="w-4 h-4 mr-1" />
                  {flight.airline} {flight.flightNumber}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Voo direto
                </span>
              </div>
              <div>
                {flight.availableSeats} assentos disponíveis
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}