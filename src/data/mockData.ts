export const employees = [
  {
    id: 1,
    name: "Juan Pérez",
    position: "Secretario",
    department: "Administración",
    email: "juan.perez@company.com",
    phone: "+1 (123) 456-7890",
    photo: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600",
    bio: "Juan es un secretario con experiencia en gestión administrativa.",
    joinDate: "2020-03-15",
    completedSurveys: []
  }
];

export const surveys = [
  {
    id: 1,
    title: "Ficha Social del Cliente",
    description: "Formulario para registrar la información social de los clientes.",
    questions: [
      {
        id: 1,
        text: "Número de cédula del cliente",
        type: "text" as const,
      },
      {
        id: 2,
        text: "Apellidos y nombres completos del cliente",
        type: "text" as const,
      },
      {
        id: 3,
        text: "Sistema al que pertenece",
        type: "multiple_choice" as const,
        options: ["Sistema 1", "Sistema 2", "Sistema 3", "Sistema 4"]
      },
      {
        id: 4,
        text: "Área de trabajo a la que pertenece",
        type: "multiple_choice" as const,
        options: ["Administrativa", "Operativa", "Técnica", "Comercial", "Servicios"]
      },
      {
        id: 5,
        text: "Puesto o cargo de trabajo",
        type: "text" as const,
      },
      {
        id: 6,
        text: "Tipo de contrato que posee",
        type: "multiple_choice" as const,
        options: ["Indefinido", "Temporal", "Por obra", "Medio tiempo", "Servicios profesionales"]
      },
      {
        id: 7,
        text: "Fecha de nacimiento",
        type: "date" as const,
      }
    ]
  }
];

export const surveyResponses = [];