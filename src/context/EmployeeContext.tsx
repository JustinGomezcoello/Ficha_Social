import { createContext, useContext, useState, ReactNode } from 'react';
import { employees as initialEmployees } from '../data/mockData';

export interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  photo: string;
  bio: string;
  joinDate: string;
  completedSurveys: string[];
}

interface EmployeeContextType {
  employees: Employee[];
  updateEmployee: (id: number, data: Partial<Employee>) => void;
  getEmployee: (id: number) => Employee | undefined;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export function EmployeeProvider({ children }: { children: ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);

  const updateEmployee = (id: number, data: Partial<Employee>) => {
    setEmployees(employees.map(emp => 
      emp.id === id ? { ...emp, ...data } : emp
    ));
  };

  const getEmployee = (id: number) => {
    return employees.find(emp => emp.id === id);
  };

  return (
    <EmployeeContext.Provider value={{ employees, updateEmployee, getEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployees() {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
}