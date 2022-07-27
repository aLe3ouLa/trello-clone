interface CardProps {
  text: string;
}

export const Card = ({ text }: CardProps) => {
  return (
    <article className="bg-slate-50 cursor-pointer mb-1 p-2 max-w-100 rounded-sm shadow-black">
      {text}
    </article>
  );
};
