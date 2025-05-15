import { createContext, useContext, useState, ReactNode } from 'react';
import { surveys as initialSurveys, surveyResponses as initialResponses } from '../data/mockData';

export interface Survey {
  id: number;
  title: string;
  description: string;
  questions: {
    id: number;
    text: string;
    type: 'multiple_choice' | 'text' | 'rating' | 'date';
    options?: string[];
  }[];
}

export interface SurveyResponse {
  id: number;
  surveyId: number;
  employeeId: number;
  date: string;
  answers: {
    questionId: number;
    answer: string | number;
  }[];
}

interface SurveyContextType {
  surveys: Survey[];
  responses: SurveyResponse[];
  addSurveyResponse: (response: Omit<SurveyResponse, 'id'>) => void;
  getSurveyById: (id: number) => Survey | undefined;
  getResponsesBySurveyId: (surveyId: number) => SurveyResponse[];
  getResponsesByEmployeeId: (employeeId: number) => SurveyResponse[];
}

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export function SurveyProvider({ children }: { children: ReactNode }) {
  const [surveys] = useState<Survey[]>(initialSurveys);
  const [responses, setResponses] = useState<SurveyResponse[]>(initialResponses);

  const addSurveyResponse = (response: Omit<SurveyResponse, 'id'>) => {
    const newResponse = {
      ...response,
      id: responses.length + 1,
    };
    setResponses([...responses, newResponse]);
  };

  const getSurveyById = (id: number) => {
    return surveys.find(survey => survey.id === id);
  };

  const getResponsesBySurveyId = (surveyId: number) => {
    return responses.filter(response => response.surveyId === surveyId);
  };

  const getResponsesByEmployeeId = (employeeId: number) => {
    return responses.filter(response => response.employeeId === employeeId);
  };

  return (
    <SurveyContext.Provider 
      value={{ 
        surveys, 
        responses, 
        addSurveyResponse, 
        getSurveyById,
        getResponsesBySurveyId,
        getResponsesByEmployeeId
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
}

export function useSurveys() {
  const context = useContext(SurveyContext);
  if (context === undefined) {
    throw new Error('useSurveys must be used within a SurveyProvider');
  }
  return context;
}