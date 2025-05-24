import { useTheme } from "@/containers/ThemeProvider.tsx";

export type SwitchProps = {
  disabled?: boolean;
  className?: string;
};

export const Switch = ({ disabled = false, className = "" }: SwitchProps) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = (switchToDark: boolean) => {
    if (!switchToDark) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={theme === "dark"}
      disabled={disabled}
      onClick={() => toggleTheme(!(theme === "dark"))}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full
        transition-colors duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        disabled:cursor-not-allowed disabled:opacity-50
        ${theme === "dark" ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"}
        ${className}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white
          transition-transform duration-200 ease-in-out
          ${theme === "dark" ? "translate-x-6" : "translate-x-1"}
        `}
      />
    </button>
  );
};
