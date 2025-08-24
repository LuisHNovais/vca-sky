import React, { useState } from 'react';
import { Plane, Globe } from 'lucide-react';
import SearchForm, { SearchData } from './components/SearchForm';
import PopularRoutes, { Flight } from './components/PopularRoutes';
import BookingModal from './components/BookingModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  const handleSearch = (searchData: SearchData) => {
    console.log('Pesquisando voos:', searchData);
    // Aqui você implementaria a lógica de pesquisa real
    alert(`Pesquisando voos de ${searchData.origin} para ${searchData.destination} em ${new Date(searchData.departureDate).toLocaleDateString('pt-BR')}`);
  };

  const handleSelectFlight = (flight: Flight) => {
    setSelectedFlight(flight);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFlight(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-full">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">SkyBooking</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Voos</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Hotéis</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Pacotes</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Minhas Viagens</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Encontre as Melhores
              <span className="text-blue-600"> Passagens Aéreas</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Compare preços, horários e companhias aéreas. Viaje mais pagando menos.
            </p>
            <div className="flex items-center justify-center mt-6 space-x-2 text-blue-600">
              <Globe className="w-5 h-5" />
              <span className="text-sm font-medium">Mais de 500 destinos disponíveis</span>
            </div>
          </div>

          {/* Search Form */}
          <SearchForm onSearch={handleSearch} />
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <PopularRoutes onSelectFlight={handleSelectFlight} />
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Por que escolher a SkyBooking?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Melhor Preço</h3>
              <p className="text-gray-600">Comparamos preços de todas as companhias aéreas para você encontrar a melhor oferta.</p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">500+ Destinos</h3>
              <p className="text-gray-600">Voe para qualquer lugar do mundo com nossa ampla rede de destinos disponíveis.</p>
            </div>

            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Suporte 24/7</h3>
              <p className="text-gray-600">Nossa equipe está sempre disponível para ajudar você antes, durante e após sua viagem.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-blue-600 p-2 rounded-full">
                  <Plane className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">SkyBooking</h3>
              </div>
              <p className="text-gray-400">Sua plataforma de confiança para reservas de passagens aéreas.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre Nós</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Imprensa</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Parcerias</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Política de Cancelamento</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📞 0800 123 4567</li>
                <li>✉️ contato@skybooking.com</li>
                <li>📍 São Paulo, SP</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SkyBooking. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        flight={selectedFlight}
      />
    </div>
  );
}

export default App;