interface loadingCircleProps {
  percentage: number;
}

const circumference = 30 * 2 * Math.PI;

export default function LoadingCircle({ percentage }: loadingCircleProps) {
  return (
    <div className="inline-flex items-center justify-center overflow-hidden rounded-full">
      <svg className="w-20 h-20">
        <circle
          className="text-gray-300"
          stroke-width="5"
          stroke="currentColor"
          fill="transparent"
          r="30"
          cx="40"
          cy="40"
        />
        <circle
          className="text-blue-500"
          stroke-width="5"
          stroke-dasharray={circumference}
          stroke-dashoffset={circumference - (percentage / 100) * circumference}
          stroke-linecap="round"
          stroke="currentColor"
          fill="transparent"
          r="30"
          cx="40"
          cy="40"
        />
      </svg>
      <span className="absolute text-xl text-blue-700">{percentage}%</span>
    </div>
  );
}
