import { useState } from 'react';
import { useEmployees } from '../../context/EmployeeContext';
import { Save } from 'lucide-react';

export default function UserProfilePage() {
  // For demo, we're assuming the logged-in user is employee #1
  const { getEmployee, updateEmployee } = useEmployees();
  const currentEmployee = getEmployee(1);
  
  const [formData, setFormData] = useState({
    name: currentEmployee?.name || '',
    position: currentEmployee?.position || '',
    department: currentEmployee?.department || '',
    email: currentEmployee?.email || '',
    phone: currentEmployee?.phone || '',
    bio: currentEmployee?.bio || '',
    photo: currentEmployee?.photo || '',
  });
  
  const [isSaved, setIsSaved] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (isSaved) setIsSaved(false);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentEmployee) {
      updateEmployee(currentEmployee.id, formData);
      setIsSaved(true);
      
      // Reset the saved message after 3 seconds
      setTimeout(() => {
        setIsSaved(false);
      }, 3000);
    }
  };
  
  if (!currentEmployee) {
    return (
      <div className="container mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Perfil No Encontrado</h2>
          <p className="text-gray-600">No se ha podido cargar la información de tu perfil.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Mi Perfil</h2>
        
        {isSaved && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  No se ha podido cargar la información de su perfil.
                </p>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre y Apellido
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                Posición
              </label>
              <input
                type="text"
                name="position"
                id="position"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.position}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                Departamento
              </label>
              <select
                name="department"
                id="department"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.department}
                onChange={handleChange}
              >
                <option value="">Seleccione Departamento</option>
                <option value="Engineering">Ingeniería</option>
                <option value="Design">Diseño</option>
                <option value="Marketing">Marketing</option>
                <option value="Management">Gestión</option>
                <option value="Analytics">Analítica</option>
                <option value="Finance">Finanzas</option>
                <option value="HR">HR</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Número de Teléfonos
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                Photo URL
              </label>
              <input
                type="url"
                name="photo"
                id="photo"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.photo}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Biografía
            </label>
            <textarea
              name="bio"
              id="bio"
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <img 
              src={formData.photo || 'https://via.placeholder.com/150'} 
              alt="Profile preview" 
              className="w-20 h-20 rounded-full object-cover"
            />
            <p className="text-sm text-gray-500">Vista previa de la foto de perfil actual</p>
          </div>
          
          <div>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Save className="h-4 w-4 mr-2" />
              Guardar Perfil
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}