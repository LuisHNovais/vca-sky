import React, { useState } from 'react';
import { Search, MapPin, Calendar, ArrowLeftRight, Users } from 'lucide-react';
import AirportAutocomplete from './AirportAutocomplete';
import { FlightService } from '../services/flightService';
import { Airport } from '../types';

interface SearchFormProps {
  onSearch: (searchData: SearchData) => void;
}

export interface SearchData {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  isRoundTrip: boolean;
  class: 'economy' | 'premium-economy' | 'business' | 'first';
  originAirport?: Airport;
  destinationAirport?: Airport;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [searchData, setSearchData] = useState<SearchData>({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    isRoundTrip: false,
    class: 'economy'
  });
  const flightService = FlightService.getInstance();
  const flightClasses = flightService.getFlightClasses();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchData.originAirport && searchData.destinationAirport && searchData.departureDate) {
      onSearch(searchData);
    }
  };

  const swapDestinations = () => {
    setSearchData(prev => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin,
      originAirport: prev.destinationAirport,
      destinationAirport: prev.originAirport
    }));
  };

  const handleOriginChange = (value: string, airport?: Airport) => {
    setSearchData(prev => ({
      ...prev,
      origin: value,
      originAirport: airport
    }));
  };

  const handleDestinationChange = (value: string, airport?: Airport) => {
    setSearchData(prev => ({
      ...prev,
      destination: value,
      destinationAirport: airport
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end">
        <AirportAutocomplete
          value={searchData.origin}
          onChange={handleOriginChange}
          placeholder="São Paulo (GRU)"
          label="Origem"
          required
        />

        <div className="relative">
          <AirportAutocomplete
            value={searchData.destination}
            onChange={handleDestinationChange}
            placeholder="Rio de Janeiro (GIG)"
            label="Destino"
            required
          />
          <button
            type="button"
            onClick={swapDestinations}
            className="absolute right-3 top-10 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors z-10"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="inline w-4 h-4 mr-1" />
            Data de Ida
          </label>
          <input
            type="date"
            value={searchData.departureDate}
            onChange={(e) => setSearchData(prev => ({ ...prev, departureDate: e.target.value }))}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Users className="inline w-4 h-4 mr-1" />
            Classe
          </label>
          <select
            value={searchData.class}
            onChange={(e) => setSearchData(prev => ({ ...prev, class: e.target.value as any }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {flightClasses.map(cls => (
              <option key={cls.value} value={cls.value}>
                {cls.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="roundTrip"
              checked={searchData.isRoundTrip}
              onChange={(e) => setSearchData(prev => ({ ...prev, isRoundTrip: e.target.checked }))}
              className="mr-2 text-blue-600"
            />
            <label htmlFor="roundTrip" className="text-sm font-medium text-gray-700">
              <Calendar className="inline w-4 h-4 mr-1" />
              Ida e Volta
            </label>
          </div>
          <input
            type="date"
            value={searchData.returnDate}
            onChange={(e) => setSearchData(prev => ({ ...prev, returnDate: e.target.value }))}
            min={searchData.departureDate || new Date().toISOString().split('T')[0]}
            disabled={!searchData.isRoundTrip}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          />
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center mx-auto"
        >
          <Search className="w-5 h-5 mr-2" />
          Pesquisar Voos
        </button>
      </div>
    </form>
  );
}