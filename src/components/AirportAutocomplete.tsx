import React, { useState, useEffect, useRef } from 'react';
import { MapPin, X } from 'lucide-react';
import { Airport } from '../types';
import { AirportService } from '../services/airportService';

interface AirportAutocompleteProps {
  value: string;
  onChange: (value: string, airport?: Airport) => void;
  placeholder?: string;
  label: string;
  required?: boolean;
}

export default function AirportAutocomplete({ 
  value, 
  onChange, 
  placeholder, 
  label, 
  required = false 
}: AirportAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Airport[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const airportService = AirportService.getInstance();

  useEffect(() => {
    if (value.length > 0) {
      const results = airportService.searchAirports(value);
      setSuggestions(results);
      setIsOpen(results.length > 0);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
    setSelectedIndex(-1);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleSuggestionClick = (airport: Airport) => {
    const displayValue = `${airport.city} (${airport.code})`;
    onChange(displayValue, airport);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const clearInput = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <MapPin className="inline w-4 h-4 mr-1" />
        {label}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => value && setIsOpen(suggestions.length > 0)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder={placeholder}
          className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required={required}
          autoComplete="off"
        />
        {value && (
          <button
            type="button"
            onClick={clearInput}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {isOpen && suggestions.length > 0 && (
        <ul
          ref={listRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
        >
          {suggestions.map((airport, index) => (
            <li
              key={airport.code}
              onClick={() => handleSuggestionClick(airport)}
              className={`px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-blue-50 ${
                index === selectedIndex ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">
                    {airport.city} ({airport.code})
                  </div>
                  <div className="text-sm text-gray-500 truncate">
                    {airport.name}
                  </div>
                </div>
                <div className="text-xs text-gray-400 ml-2">
                  {airport.country}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}