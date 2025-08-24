import React, { useState } from 'react';
import { X, Plane, User, Phone, Mail, CreditCard, Clock, MapPin, Luggage, Info } from 'lucide-react';
import { Flight } from './PopularRoutes';
import { Flight as FlightType } from '../types';
import { FlightService } from '../services/flightService';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  flight: Flight | FlightType | null;
}

interface BookingForm {
  fullName: string;
  cpf: string;
  phone: string;
  email: string;
}

export default function BookingModal({ isOpen, onClose, flight }: BookingModalProps) {
  const [formData, setFormData] = useState<BookingForm>({
    fullName: '',
    cpf: '',
    phone: '',
    email: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Solicitação de contato enviada com sucesso! Entraremos em contato em breve.');
    setIsSubmitting(false);
    onClose();
    
    // Resetar formulário
    setFormData({
      fullName: '',
      cpf: '',
      phone: '',
      email: ''
    });
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  if (!isOpen || !flight) return null;

  const flightService = FlightService.getInstance();
  
  // Determine if this is a new flight type or legacy flight type
  const isNewFlightType = 'origin' in flight && typeof flight.origin === 'object';
  const flightData = isNewFlightType ? flight as FlightType : flight as Flight;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>

        <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold leading-6 text-gray-900 flex items-center">
              <Plane className="w-6 h-6 mr-2 text-blue-600" />
              Detalhes do Voo
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Informações do Voo */}
            <div className="space-y-6">
              {/* Itinerário */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-bold text-blue-900 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Itinerário
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {isNewFlightType ? flightData.departureTime : (flightData as Flight).departureTime}
                      </div>
                      <div className="text-sm text-gray-600">
                        {isNewFlightType ? (flightData as FlightType).origin.code : (flightData as Flight).origin}
                      </div>
                      <div className="text-xs text-gray-500">
                        {isNewFlightType ? `${(flightData as FlightType).origin.city}, ${(flightData as FlightType).origin.country}` : ''}
                      </div>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <div className="text-center">
                        <Clock className="w-4 h-4 mx-auto mb-1" />
                        <div className="text-sm">
                          {isNewFlightType ? flightService.formatDuration((flightData as FlightType).duration) : '1h 30m'}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        {isNewFlightType ? flightData.arrivalTime : (flightData as Flight).arrivalTime}
                      </div>
                      <div className="text-sm text-gray-600">
                        {isNewFlightType ? (flightData as FlightType).destination.code : (flightData as Flight).destination}
                      </div>
                      <div className="text-xs text-gray-500">
                        {isNewFlightType ? `${(flightData as FlightType).destination.city}, ${(flightData as FlightType).destination.country}` : ''}
                      </div>
                    </div>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center text-gray-600">
                        <Plane className="w-4 h-4 mr-1" />
                        {isNewFlightType ? (flightData as FlightType).airline : (flightData as Flight).airline}
                        {isNewFlightType ? ` ${(flightData as FlightType).flightNumber}` : ''}
                      </span>
                      <span className="text-gray-500">Voo direto</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informações de Bagagem */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                  <Luggage className="w-5 h-5 mr-2" />
                  Bagagem
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Bagagem de mão</span>
                    <span className="text-green-600 font-medium">Incluído</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Bagagem despachada (23kg)</span>
                    <span className="text-gray-500">+ R$ 120,00</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    * Bagagem de mão: até 10kg e dimensões 55x35x25cm
                  </div>
                </div>
              </div>

              {/* Informações Importantes */}
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h4 className="font-bold text-yellow-900 mb-4 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Informações Importantes
                </h4>
                <ul className="space-y-2 text-sm text-yellow-800">
                  <li>• Check-in online disponível 48h antes do voo</li>
                  <li>• Chegue ao aeroporto 2h antes para voos domésticos</li>
                  <li>• Documento de identidade obrigatório</li>
                  <li>• Alterações sujeitas a taxas da companhia aérea</li>
                </ul>
              </div>
            </div>

            {/* Resumo e Formulário */}
            <div className="space-y-6">
              {/* Resumo do Preço */}
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-bold text-green-900 mb-4">Resumo do Valor</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>Tarifa {isNewFlightType ? (flightData as FlightType).class.name : 'Econômica'}</span>
                    <span>{isNewFlightType ? flightService.formatPrice((flightData as FlightType).price) : `R$ ${(flightData as Flight).price}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Taxas aeroportuárias</span>
                    <span>R$ 45,00</span>
                  </div>
                  <div className="border-t border-green-200 pt-2 mt-3">
                    <div className="flex justify-between font-bold text-green-900 text-lg">
                      <span>Total</span>
                      <span>
                        {isNewFlightType 
                          ? flightService.formatPrice((flightData as FlightType).price + 45)
                          : `R$ ${(flightData as Flight).price.toString().replace(',', '') + ',00' || '0'}`
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formulário de Contato */}
              <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-4">Solicitar Contato</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Preencha seus dados e entraremos em contato para finalizar sua reserva.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <User className="inline w-4 h-4 mr-1" />
                Nome Completo
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                placeholder="Digite seu nome completo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <CreditCard className="inline w-4 h-4 mr-1" />
                CPF
              </label>
              <input
                type="text"
                value={formData.cpf}
                onChange={(e) => {
                  const formatted = formatCPF(e.target.value);
                  if (formatted.length <= 14) {
                    setFormData(prev => ({ ...prev, cpf: formatted }));
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                placeholder="000.000.000-00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Phone className="inline w-4 h-4 mr-1" />
                Telefone
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => {
                  const formatted = formatPhone(e.target.value);
                  if (formatted.length <= 15) {
                    setFormData(prev => ({ ...prev, phone: formatted }));
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                placeholder="(11) 99999-9999"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Mail className="inline w-4 h-4 mr-1" />
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                placeholder="seu@email.com"
              />
            </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 px-4 py-3 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition-colors"
                      disabled={isSubmitting}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Enviando...' : 'Solicitar Contato'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}