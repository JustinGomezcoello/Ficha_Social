import { Link } from 'react-router-dom';
import { useSurveys } from '../../context/SurveyContext';
import { ClipboardCheck, Clock, Plus } from 'lucide-react';

export default function SurveyListPage() {
  const { surveys, responses } = useSurveys();
  
  const currentEmployeeId = 1;
  const totalResponses = responses.filter(response => response.employeeId === currentEmployeeId).length;
  
  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Registro de Fichas Sociales</h2>
            <p className="text-gray-600 mt-1">
              Total de fichas registradas: {totalResponses}
            </p>
          </div>
          
          <Link
            to={`/user/surveys/1`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nueva Ficha
          </Link>
        </div>
        
        <div className="space-y-4">
          {responses.filter(response => response.employeeId === currentEmployeeId).map((response) => (
            <div key={response.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-800">
                    Ficha #{response.id}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Registrada el {new Date(response.date).toLocaleDateString()}
                  </p>
                </div>
                <Link
                  to={`/user/surveys/1`}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Nueva Ficha
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {responses.length === 0 && (
          <div className="text-center py-10">
            <div className="inline-flex items-center justify-center rounded-full bg-blue-100 p-4 mb-4">
              <ClipboardCheck className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-gray-500">No hay fichas registradas. ¡Comienza registrando una nueva!</p>
          </div>
        )}
      </div>
    </div>
  );
}