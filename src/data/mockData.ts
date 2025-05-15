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
    completedSurveys: []
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
    completedSurveys: []
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
    completedSurveys: []
  },
  {
    id: 4,
    name: "Ana Martínez",
    position: "Analista de Datos",
    department: "Analytics",
    email: "ana.martinez@company.com",
    phone: "+1 (123) 456-7893",
    photo: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    bio: "Ana es especialista en análisis de datos y visualización de información.",
    joinDate: "2022-02-15",
    completedSurveys: []
  },
  {
    id: 5,
    name: "Luis Torres",
    position: "Marketing Digital",
    department: "Marketing",
    email: "luis.torres@company.com",
    phone: "+1 (123) 456-7894",
    photo: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600",
    bio: "Luis tiene experiencia en estrategias de marketing digital y redes sociales.",
    joinDate: "2021-08-20",
    completedSurveys: []
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

export const surveyResponses = [];