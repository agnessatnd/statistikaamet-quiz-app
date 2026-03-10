import type { Question } from "../types/question";

export const questions: Question[] = [
  {
    question: "Milline saar on pindalalt Eesti suurim?",
    options: ["Hiiumaa", "Kihnu", "Vormsi", "Saaremaa"],
    correctAnswer: 3,
  },
  {
    question: "Mitu maakonda on Eestis?",
    options: ["15", "10", "18", "20"],
    correctAnswer: 0,
  },
  {
    question: "Milline linn on tuntud kui Eesti suvepealinn?",
    options: ["Kuressaare", "Pärnu", "Rakvere", "Tallinn"],
    correctAnswer: 1,
  },
  {
    question: "Milline neist on Eesti rahvuslill?",
    options: ["Roos", "Tulp", "Rukkilill", "Nartsiss"],
    correctAnswer: 2,
  },
];