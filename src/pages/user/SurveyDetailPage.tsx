import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSurveys } from '../../context/SurveyContext';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

export default function SurveyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getSurveyById, addSurveyResponse } = useSurveys();
  
  // Convert ID to number
  const surveyId = parseInt(id || '0', 10);
  const survey = getSurveyById(surveyId);
  
  // For demo, we're assuming the logged-in user is employee #1
  const currentEmployeeId = 1;
  
  // State for form answers
  const [answers, setAnswers] = useState<{ questionId: number; answer: string | number }[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  if (!survey) {
    return (
      <div className="container mx-auto py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Encuesta no encontrada</h2>
          <p className="text-gray-600 mb-4">La encuesta que estás buscando no existe.</p>
          <button
            onClick={() => navigate('/user/surveys')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Encuestas
          </button>
        </div>
      </div>
    );
  }
  
  const currentQuestion = survey.questions[currentQuestionIndex];
  
  const handleInputChange = (questionId: number, value: string | number) => {
    const newAnswers = [...answers];
    const existingAnswerIndex = newAnswers.findIndex(a => a.questionId === questionId);
    
    if (existingAnswerIndex >= 0) {
      newAnswers[existingAnswerIndex].answer = value;
    } else {
      newAnswers.push({ questionId, answer: value });
    }
    
    setAnswers(newAnswers);
  };
  
  const getCurrentAnswer = (questionId: number) => {
    return answers.find(a => a.questionId === questionId)?.answer || '';
  };
  
  const isCurrentQuestionAnswered = () => {
    const currentAnswer = getCurrentAnswer(currentQuestion.id);
    return currentAnswer !== '' && currentAnswer !== undefined;
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < survey.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Create a new survey response
    const response = {
      surveyId,
      employeeId: currentEmployeeId,
      date: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
      answers,
    };
    
    addSurveyResponse(response);
    
    // Show success message
    setIsComplete(true);
    
    // Redirect after delay
    setTimeout(() => {
      navigate('/user/surveys');
    }, 3000);
  };
  
  if (isComplete) {
    return (
      <div className="container mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="inline-flex items-center justify-center rounded-full bg-green-100 p-4 mb-6">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">¡Encuesta completada!</h2>
          <p className="text-gray-600 mb-6">
          Gracias por completar el {survey.title} encuesta. Sus comentarios son valiosos para nosotros.
          </p>
          <p className="text-gray-500 text-sm">
            Serás redirigido a la página de encuestas en un momento...
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto">
      <button
        onClick={() => navigate('/user/surveys')}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Surveys
      </button>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{survey.title}</h2>
        <p className="text-gray-600 mb-6">{survey.description}</p>
        
        <div className="mb-6">
          <div className="relative w-full h-2 bg-gray-200 rounded-full">
            <div 
              className="absolute top-0 left-0 h-2 bg-blue-600 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${((currentQuestionIndex + 1) / survey.questions.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Question {currentQuestionIndex + 1} of {survey.questions.length}
          </p>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            {currentQuestion.text}
          </h3>
          
          <div className="space-y-4">
            {currentQuestion.type === 'multiple_choice' && currentQuestion.options && (
              <div className="space-y-2">
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="radio"
                      id={`option-${index}`}
                      name={`question-${currentQuestion.id}`}
                      value={option}
                      checked={getCurrentAnswer(currentQuestion.id) === option}
                      onChange={() => handleInputChange(currentQuestion.id, option)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor={`option-${index}`} className="ml-3 block text-gray-700">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            )}
            
            {currentQuestion.type === 'rating' && currentQuestion.options && (
              <div className="flex items-center justify-between">
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="text-center">
                    <button
                      type="button"
                      onClick={() => handleInputChange(currentQuestion.id, index + 1)}
                      className={`w-10 h-10 rounded-full text-sm font-medium ${
                        getCurrentAnswer(currentQuestion.id) === index + 1
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {option}
                    </button>
                    <span className="block mt-1 text-xs text-gray-500">
                      {index === 0 ? 'Low' : index === currentQuestion.options!.length - 1 ? 'High' : ''}
                    </span>
                  </div>
                ))}
              </div>
            )}
            
            {currentQuestion.type === 'text' && (
              <textarea
                id={`question-${currentQuestion.id}`}
                value={getCurrentAnswer(currentQuestion.id) as string}
                onChange={(e) => handleInputChange(currentQuestion.id, e.target.value)}
                rows={4}
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Type your answer here..."
              />
            )}
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
              currentQuestionIndex === 0
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'text-blue-700 bg-blue-100 hover:bg-blue-200'
            }`}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </button>
          
          {currentQuestionIndex < survey.questions.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!isCurrentQuestionAnswered()}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
                !isCurrentQuestionAnswered()
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'text-white bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isCurrentQuestionAnswered() || isSubmitting}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
                !isCurrentQuestionAnswered() || isSubmitting
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'text-white bg-green-600 hover:bg-green-700'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Survey'}
              <Check className="h-4 w-4 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}