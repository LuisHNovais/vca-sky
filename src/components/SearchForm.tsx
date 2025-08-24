import React, { useState } from 'react';
import { Search, MapPin, Calendar, ArrowLeftRight } from 'lucide-react';

interface SearchFormProps {
  onSearch: (searchData: SearchData) => void;
}

export interface SearchData {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  isRoundTrip: boolean;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [searchData, setSearchData] = useState<SearchData>({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    isRoundTrip: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchData.origin && searchData.destination && searchData.departureDate) {
      onSearch(searchData);
    }
  };

  const swapDestinations = () => {
    setSearchData(prev => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="inline w-4 h-4 mr-1" />
            Origem
          </label>
          <input
            type="text"
            value={searchData.origin}
            onChange={(e) => setSearchData(prev => ({ ...prev, origin: e.target.value }))}
            placeholder="São Paulo (GRU)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="inline w-4 h-4 mr-1" />
            Destino
          </label>
          <div className="flex items-center">
            <input
              type="text"
              value={searchData.destination}
              onChange={(e) => setSearchData(prev => ({ ...prev, destination: e.target.value }))}
              placeholder="Rio de Janeiro (GIG)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <button
              type="button"
              onClick={swapDestinations}
              className="ml-2 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <ArrowLeftRight className="w-5 h-5" />
            </button>
          </div>
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