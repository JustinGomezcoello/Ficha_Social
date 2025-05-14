import { Link } from 'react-router-dom';
import { useSurveys } from '../../context/SurveyContext';
import { ClipboardCheck, Clock } from 'lucide-react';

export default function SurveyListPage() {
  const { surveys, responses } = useSurveys();
  
  // For demo purposes, we're assuming the current user is employee #1
  const currentEmployeeId = 1;
  
  // Get the surveys that the current employee has completed
  const completedSurveyIds = responses
    .filter(response => response.employeeId === currentEmployeeId)
    .map(response => response.surveyId);
  
  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Surveys</h2>
        <p className="text-gray-600 mb-6">
          Complete the following surveys to help us improve the workplace environment.
        </p>
        
        <div className="space-y-4">
          {surveys.map(survey => {
            const isCompleted = completedSurveyIds.includes(survey.id);
            
            return (
              <div 
                key={survey.id}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{survey.title}</h3>
                      <p className="text-sm text-gray-500 mb-3">{survey.description}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="flex items-center">
                          <ClipboardCheck className="h-4 w-4 mr-1" />
                          {survey.questions.length} questions
                        </span>
                        <span className="mx-2">•</span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          ~{Math.ceil(survey.questions.length * 1.5)} mins
                        </span>
                      </div>
                    </div>
                    <div>
                      {isCompleted ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      ) : (
                        <Link
                          to={`/user/surveys/${survey.id}`}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                          Take Survey
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {surveys.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No surveys are currently available.</p>
          </div>
        )}
      </div>
    </div>
  );
}