interface CardProps {
  children: React.ReactNode;
}

function Card({ children }: CardProps) {
  return <div className="w-full border border-black rounded-lg shadow bg-white p-2">{children}</div>;
}

export default Card;
