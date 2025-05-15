import { useParams, useNavigate } from 'react-router-dom';
import { useEmployees } from '../../context/EmployeeContext';
import { useSurveys } from '../../context/SurveyContext';
import { ArrowLeft, Mail, Phone, Calendar } from 'lucide-react';

export default function EmployeeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEmployee } = useEmployees();
  const { getResponsesByEmployeeId } = useSurveys();
  
  // Convert ID to number (assuming IDs are numeric)
  const employeeId = parseInt(id || '0', 10);
  const employee = getEmployee(employeeId);
  const responses = getResponsesByEmployeeId(employeeId);
  
  if (!employee) {
    return (
      <div className="container mx-auto py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Empleado No Encontrado</h2>
          <p className="text-gray-600 mb-4">El empleado que busca no existe.</p>
          <button
            onClick={() => navigate('/admin/employees')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Empleados
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto">
      <button
        onClick={() => navigate('/admin/employees')}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Volver a Empleados
      </button>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img 
              src={employee.photo} 
              alt={employee.name} 
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="p-6 md:w-2/3">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{employee.name}</h2>
            <p className="text-gray-600 text-lg mb-4">{employee.position} • {employee.department}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-2" />
                <span>{employee.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-2" />
                <span>{employee.phone}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <span>Joined: {new Date(employee.joinDate).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Biografiía</h3>
              <p className="text-gray-600">{employee.bio}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Encuestas Completadas</h3>
        
        {responses.length > 0 ? (
          <div className="space-y-4">
            {responses.map((response) => (
              <div key={response.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-medium text-gray-800">
                    {useSurveys().getSurveyById(response.surveyId)?.title || 'Unknown Survey'}
                  </h4>
                  <span className="text-sm text-gray-500">
                    {new Date(response.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {response.answers.length} preguntas respondidas
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Este empleado aún no ha completado ninguna encuesta.</p>
        )}
      </div>
    </div>
  );
}