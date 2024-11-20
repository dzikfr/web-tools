import React from 'react';

interface HeaderProps {
  title: string;
}

const Tittle: React.FC<HeaderProps> = ({ title }) => {
  return (
    <h1 className="mb-6 border-4 border-black bg-yellow-300 px-4 py-2 text-4xl font-extrabold text-black">
      {title}
    </h1>
  );
};

export default Tittle;