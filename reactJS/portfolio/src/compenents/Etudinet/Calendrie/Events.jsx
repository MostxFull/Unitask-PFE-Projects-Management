export const events = [
  {
      id: 1,
      title: "Réunion",
      start: new Date(2025, 1, 23, 10, 0),
      end: new Date(2025, 1, 24, 12, 0),
      desc: "A description",
    },
    {
      id: 2,
      title: "Conférence",
      start: new Date(2023, 10, 16, 10, 30),
      end: new Date(2023, 10, 16, 12, 30),
      color: "black",
      desc: "Conférence",
    },
    {
      id: 3,
      title: "Démo",
      start: moment("2025-01-23").toDate(),
      end: moment("2025-01-24").toDate(),
      desc: "Démonstration",
    },
];