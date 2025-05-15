import { useSurveys } from '../../context/SurveyContext';
import { Bar, Pie, Line } from 'react-chartjs-2';
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

// Register ChartJS components
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
  
  // Calculate survey completion rate
  const totalEmployees = 5; // In a real app, this would come from your employee count
  const uniqueRespondents = new Set(responses.map(r => r.employeeId)).size;
  const completionRate = (uniqueRespondents / totalEmployees) * 100;
  
  // Prepare data for surveys completion chart
  const surveyCompletionData = {
    labels: surveys.map(s => s.title),
    datasets: [
      {
        label: 'Responses',
        data: surveys.map(survey => 
          responses.filter(r => r.surveyId === survey.id).length
        ),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  // Prepare data for satisfaction ratings
  const satisfactionSurvey = surveys.find(s => s.title === "Employee Satisfaction 2023");
  let satisfactionData = {
    labels: ['Very Dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very Satisfied'],
    datasets: [
      {
        label: 'Responses',
        data: [0, 0, 1, 2, 0],
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
      },
    ],
  };
  
  if (satisfactionSurvey) {
    const roleQuestion = satisfactionSurvey.questions.find(q => q.text.includes("role"));
    if (roleQuestion) {
      const roleResponses = responses
        .filter(r => r.surveyId === satisfactionSurvey.id)
        .map(r => r.answers.find(a => a.questionId === roleQuestion.id)?.answer as number)
        .filter(rating => rating !== undefined);
      
      const ratings = [1, 2, 3, 4, 5];
      satisfactionData.datasets[0].data = ratings.map(rating => 
        roleResponses.filter(r => r === rating).length
      );
    }
  }
  
  // Department distribution data
  const departmentPieData = {
    labels: ['Engineering', 'Design', 'Management', 'Analytics', 'Marketing'],
    datasets: [
      {
        label: 'Employees',
        data: [1, 1, 1, 1, 1], // In a real app, you'd calculate this from your employees
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgb(54, 162, 235)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
          'rgb(255, 159, 64)',
          'rgb(255, 99, 132)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Cuadro de Análisis</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Total de Empleados</h3>
            <p className="text-3xl font-bold text-blue-600">{totalEmployees}</p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Encuestados</h3>
            <p className="text-3xl font-bold text-green-600">{uniqueRespondents}</p>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Tasa de finalización</h3>
            <p className="text-3xl font-bold text-purple-600">{completionRate.toFixed(0)}%</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Respuestas a la encuesta</h3>
            <div className="h-64">
              <Bar 
                data={surveyCompletionData} 
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
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Satisfacción</h3>
            <div className="h-64">
              <Pie 
                data={satisfactionData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Distribución por Departamentos</h3>
          <div className="h-64">
            <Bar 
              data={departmentPieData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y' as const,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}