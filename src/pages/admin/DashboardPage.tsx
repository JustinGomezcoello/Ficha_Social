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
  
  const totalResponses = responses.length;
  
  // Preparar datos para cada pregunta
  const survey = surveys[0];
  const questionCharts = survey.questions.map(question => {
    let data;
    
    if (question.type === 'multiple_choice') {
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
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ],
          borderColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 99, 132)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',
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
        
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 mb-8">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Total de Fichas Registradas</h3>
          <p className="text-3xl font-bold text-blue-600">{totalResponses}</p>
        </div>
        
        {questionCharts.map((item, index) => (
          item.data && (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">{item.question.text}</h3>
              <div className="h-64">
                <Pie
                  data={item.data}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                      },
                    },
                  }}
                />
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}