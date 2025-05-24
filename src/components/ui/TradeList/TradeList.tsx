import { useEffect, useMemo, useRef } from "react";
import { type Trade, TradeRow } from "./TradeRow.tsx";
import { AnimatePresence } from "framer-motion";

type TradesListProps = {
  trades: Trade[];
};

export const TradeList = ({ trades }: TradesListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current && trades.length) scrollRef.current.scrollTop = 0;
  }, [trades.length]);

  const listElements = useMemo(() => {
    return trades?.map((trade, i) => {
      return <TradeRow key={trade.id} trade={trade} index={i} />;
    });
  }, [trades]);

  if (!trades.length) {
    return (
      <div className="p-8 text-center text-gray-500 dark:text-gray-400">
        <p>No trades to display</p>
      </div>
    );
  }

  return (
    <div ref={scrollRef} className="max-h-96 overflow-y-auto">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Side
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                User
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            <AnimatePresence initial={false}>{listElements}</AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};
