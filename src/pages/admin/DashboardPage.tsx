import { useSurveys } from '../../context/SurveyContext';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function DashboardPage() {
  const { surveys, responses } = useSurveys();
  
  const totalEmployees = 5;
  const uniqueRespondents = new Set(responses.map(r => r.employeeId)).size;
  const completionRate = (uniqueRespondents / totalEmployees) * 100;
  
  // Preparar datos para cada pregunta
  const survey = surveys[0]; // Asumimos que es la única encuesta por ahora
  const questionCharts = survey.questions.map(question => {
    let data;
    
    if (question.type === 'rating') {
      const ratings = [1, 2, 3, 4, 5];
      const counts = ratings.map(rating => 
        responses.filter(r => 
          r.answers.find(a => a.questionId === question.id && a.answer === rating)
        ).length
      );
      
      data = {
        labels: ['Muy Insatisfecho', 'Insatisfecho', 'Neutral', 'Satisfecho', 'Muy Satisfecho'],
        datasets: [{
          label: 'Respuestas',
          data: counts,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 205, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(54, 162, 235, 0.6)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
          ],
          borderWidth: 1,
        }]
      };
    } else if (question.type === 'multiple_choice') {
      const optionCounts = question.options?.map(option => 
        responses.filter(r => 
          r.answers.find(a => a.questionId === question.id && a.answer === option)
        ).length
      ) || [];
      
      data = {
        labels: question.options,
        datasets: [{
          label: 'Respuestas',
          data: optionCounts,
          backgroundColor: [
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 205, 86, 0.6)',
          ],
          borderColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 99, 132)',
            'rgb(255, 205, 86)',
          ],
          borderWidth: 1,
        }]
      };
    }
    
    return { question, data };
  });
  
  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Panel de Análisis</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Total de Empleados</h3>
            <p className="text-3xl font-bold text-blue-600">{totalEmployees}</p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Encuestas Completadas</h3>
            <p className="text-3xl font-bold text-green-600">{uniqueRespondents}</p>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Tasa de Finalización</h3>
            <p className="text-3xl font-bold text-purple-600">{completionRate.toFixed(0)}%</p>
          </div>
        </div>
        
        {questionCharts.map((item, index) => (
          item.data && (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">{item.question.text}</h3>
              <div className="h-64">
                {item.question.type === 'rating' ? (
                  <Bar
                    data={item.data}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                    }}
                  />
                ) : (
                  <Pie
                    data={item.data}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                )}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}