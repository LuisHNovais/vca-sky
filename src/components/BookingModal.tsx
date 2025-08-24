import React, { useState } from 'react';
import { X, Plane, User, Phone, Mail, CreditCard } from 'lucide-react';
import { Flight } from './PopularRoutes';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  flight: Flight | null;
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
    
    alert('Compra realizada com sucesso! Você receberá a confirmação por email.');
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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>

        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl sm:max-w-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
              <Plane className="w-5 h-5 mr-2 text-blue-600" />
              Finalizar Compra
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Dados do Voo */}
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h4 className="font-semibold text-blue-900 mb-2">Detalhes do Voo</h4>
            <div className="space-y-1 text-sm text-blue-800">
              <div className="flex justify-between">
                <span>Trecho:</span>
                <span>{flight.origin} → {flight.destination}</span>
              </div>
              <div className="flex justify-between">
                <span>Data:</span>
                <span>{new Date(flight.date).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex justify-between">
                <span>Horário:</span>
                <span>{flight.departureTime} - {flight.arrivalTime}</span>
              </div>
              <div className="flex justify-between">
                <span>Companhia:</span>
                <span>{flight.airline}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span className="text-green-600">R$ {flight.price}</span>
              </div>
            </div>
          </div>

          {/* Formulário */}
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
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition-colors"
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processando...' : 'Solicitar contato'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}