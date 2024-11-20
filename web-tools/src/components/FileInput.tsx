import React from 'react';

interface FileInputProps {
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const FileInput: React.FC<FileInputProps> = ({ id, onChange, label }) => {
  return (
    <div className="flex justify-center">
      <label
        htmlFor={id}
        className="rounded-lg border-4 border-black bg-white px-6 py-3 font-bold text-black shadow-[3px_3px_0px_#000000]"
      >
        {label}
      </label>
      <input
        id={id}
        type="file"
        onChange={onChange}
        className="hidden"
      />
    </div>
  );
};

export default FileInput;