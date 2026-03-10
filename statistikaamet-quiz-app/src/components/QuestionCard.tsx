type Props = {
  question: string;
  options: string[];
  onAnswer: (index: number) => void;
};

export default function QuestionCard({ question, options, onAnswer }: Props) {
  return (
    <div>
      <h2>{question}</h2>

      {options.map((option, index) => (
        <div key={index}>
          <button onClick={() => onAnswer(index)}>
            {option}
          </button>
        </div>
      ))}
    </div>
  );
}