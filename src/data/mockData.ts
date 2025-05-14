export const employees = [
  {
    id: 1,
    name: "Juan Pérez",
    position: "Desarrollador de Software",
    department: "Ingeniería",
    email: "juan.perez@company.com",
    phone: "+1 (123) 456-7890",
    photo: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600",
    bio: "Juan es un desarrollador senior con 8 años de experiencia en tecnologías web.",
    joinDate: "2020-03-15",
    completedSurveys: ["Satisfacción Laboral 2023"]
  },
  {
    id: 2,
    name: "María González",
    position: "Diseñadora UI/UX",
    department: "Diseño",
    email: "maria.gonzalez@company.com",
    phone: "+1 (123) 456-7891",
    photo: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
    bio: "María es una diseñadora creativa enfocada en crear experiencias de usuario atractivas.",
    joinDate: "2021-05-20",
    completedSurveys: ["Satisfacción Laboral 2023"]
  },
  {
    id: 3,
    name: "Carlos Rodríguez",
    position: "Gerente de Proyectos",
    department: "Gerencia",
    email: "carlos.rodriguez@company.com",
    phone: "+1 (123) 456-7892",
    photo: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
    bio: "Carlos ha estado gestionando proyectos tecnológicos durante más de 10 años.",
    joinDate: "2019-01-10",
    completedSurveys: ["Satisfacción Laboral 2023"]
  }
];

export const surveys = [
  {
    id: 1,
    title: "Satisfacción Laboral 2023",
    description: "Encuesta anual para medir la satisfacción general de los empleados e identificar áreas de mejora.",
    questions: [
      {
        id: 1,
        text: "¿Qué tan satisfecho estás con tu rol actual?",
        type: "rating" as const,
        options: ["1", "2", "3", "4", "5"]
      },
      {
        id: 2,
        text: "¿Cómo calificarías la cultura de la empresa?",
        type: "rating" as const,
        options: ["1", "2", "3", "4", "5"]
      },
      {
        id: 3,
        text: "¿Sientes que tu trabajo es valorado?",
        type: "multiple_choice" as const,
        options: ["Sí", "No", "A veces"]
      },
      {
        id: 4,
        text: "¿Qué mejoras sugerirías para la empresa?",
        type: "text" as const
      }
    ]
  }
];

export const surveyResponses = [
  {
    id: 1,
    surveyId: 1,
    employeeId: 1,
    date: "2023-12-15",
    answers: [
      { questionId: 1, answer: 4 },
      { questionId: 2, answer: 3 },
      { questionId: 3, answer: "A veces" },
      { questionId: 4, answer: "Más actividades de integración del equipo." }
    ]
  },
  {
    id: 2,
    surveyId: 1,
    employeeId: 2,
    date: "2023-12-14",
    answers: [
      { questionId: 1, answer: 5 },
      { questionId: 2, answer: 4 },
      { questionId: 3, answer: "Sí" },
      { questionId: 4, answer: "Mejor comunicación entre departamentos." }
    ]
  }
];