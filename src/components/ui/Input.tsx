export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className = "", type, ...props }: InputProps) => {
  return (
    <input
      type={type}
      className={`
          flex h-12 w-full rounded-lg border border-gray-300 dark:border-gray-600 
          bg-white dark:bg-gray-800 px-4 py-2 text-base
          text-gray-900 dark:text-white
          placeholder:text-gray-500 dark:placeholder:text-gray-400
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
          disabled:cursor-not-allowed disabled:opacity-50
          transition-colors duration-200
          ${className}
        `}
      {...props}
    />
  );
};
