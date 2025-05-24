import { ThemeProvider } from "@/containers";
import { Moon, Sun, TrendingUp } from "lucide-react";
import { Switch } from "@/ui";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-[#18181A] transition-colors duration-300">
        <div className="container mx-auto px-4 py-6">
          <header className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Solana Trade Monitor
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <Switch />
              <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </div>
          </header>

          <main>{children}</main>
        </div>
      </div>
    </ThemeProvider>
  );
};
