import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {

  const [services, setServices] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const fetchServices = async () => {
  
    try {
      const response = await axios.get('http://localhost:8000/api/services');
      if (response.status === 200) {
        setServices(response.data);
      }

    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="bg-red-500 text-white text-3xl font-bold p-4 rounded-md text-center">
        Hello, this is my Even App
      </h1>

      {loading ? (
        <p className="text-gray-600 text-center mt-4">Chargement des services...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {services && services.map((service) => (
            <div key={service.id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">{service.title}</h2>
              <p className="text-gray-600 mt-2">{service.description}</p>
              <p className="text-green-600 font-semibold mt-2">{service.price}€</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App;