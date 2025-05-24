import { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TradeList } from "@/ui";
import type { Trade } from "@/ui/TradeList/TradeRow.tsx";
import { usePumpListener } from "../../hooks/usePumpListener.ts";

type TradesContainerProps = {
  mintAddress: string;
  isStreaming: boolean;
};

export const TradeListContainer = ({
  mintAddress,
  isStreaming,
}: TradesContainerProps) => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [buffer, setBuffer] = useState<Trade[]>([]);

  useEffect(() => {
    const id = setInterval(() => {
      if (!buffer.length) return;

      setTrades((prev) => {
        const merged = [...buffer, ...prev].slice(0, 100);
        setBuffer([]);
        return merged;
      });
    }, 100);
    return () => clearInterval(id);
  }, [buffer]);

  const queueTrade = useCallback((trade: Trade) => {
    setBuffer((prev) => [...prev, trade]);
  }, []);

  usePumpListener(mintAddress, (t) => queueTrade(t), isStreaming);

  const clearTrades = useCallback(() => setTrades([]), []);

  const mintAddressDisplay = useMemo(() => {
    if (!mintAddress) return null;
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
            Monitoring:
          </span>
          <code className="text-sm font-mono text-blue-900 dark:text-blue-100 bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded truncate block max-w-full">
            {mintAddress}
          </code>
        </div>
      </motion.div>
    );
  }, [mintAddress]);

  return (
    <div className="space-y-6">
      {mintAddressDisplay}

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Live Trades
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Real-time trade data for the monitored token
            </p>
          </div>

          <AnimatePresence>
            {trades.length > 0 && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                whileHover={{ scale: 1.05 }}
                onClick={clearTrades}
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Clear trades ({trades.length})
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <TradeList trades={trades} />
      </div>
    </div>
  );
};
