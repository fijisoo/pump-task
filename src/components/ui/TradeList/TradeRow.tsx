import { motion } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";

export type Trade = {
  id: string;
  time: string;
  side: "BUY" | "SELL";
  amount: number;
  user: string;
  name: string;
  symbol: string;
  logo: string;
};

export const TradeRow = ({ trade, index }: { trade: Trade; index: number }) => (
    <motion.tr
        initial={{
          opacity: 0,
          y: -20,
          scale: 0.95,
          backgroundColor:
              trade.side === "BUY" ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)",
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          backgroundColor: index === 0 ? "rgba(59,130,246,0.1)" : "transparent",
        }}
        exit={{opacity: 0, y: -10, scale: 0.95, transition: {duration: 0.2}}}
        transition={{
          duration: 0.5,
          ease: "easeOut",
          backgroundColor: {delay: 0.5, duration: 0.3},
        }}
        className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 border-l-4 border-transparent ${
            trade.side === "BUY"
                ? "hover:border-l-green-400"
                : "hover:border-l-red-400"
        }`}
        whileHover={{scale: 1.01, transition: {duration: 0.2}}}
    >
      <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-mono">
        <motion.span
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 0.1}}
        >
          {trade.time}
        </motion.span>
      </td>
      <td className="px-4 py-3">
        <motion.div
            initial={{opacity: 0, x: -10}}
            animate={{opacity: 1, x: 0}}
            transition={{delay: 0.15}}
            className="flex items-center gap-2"
        >
          <img
              src={trade.logo || "/bonk.png"}
              alt={trade.name}
              className="w-6 h-6 rounded-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/bonk.png"
              }}
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{trade.symbol}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[100px]">{trade.name}</span>
          </div>
        </motion.div>
      </td>
      <td className="px-4 py-3">
        <motion.div
            initial={{scale: 0, rotate: -180}}
            animate={{scale: 1, rotate: 0}}
            transition={{delay: 0.2, type: "spring", stiffness: 200}}
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                trade.side === "BUY"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
            }`}
        >
          <motion.div
              initial={{y: trade.side === "BUY" ? 10 : -10}}
              animate={{y: 0}}
              transition={{delay: 0.3, type: "spring"}}
          >
            {trade.side === "BUY" ? (
                <ArrowUp className="h-3 w-3"/>
            ) : (
                <ArrowDown className="h-3 w-3"/>
            )}
          </motion.div>
          {trade.side}
        </motion.div>
      </td>
      <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-mono text-right">
        <motion.span
            initial={{opacity: 0, x: 20}}
            animate={{opacity: 1, x: 0}}
            transition={{delay: 0.2}}
        >
          {trade.amount?.toLocaleString()}
        </motion.span>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-mono">
        <motion.span
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 0.25}}
        >
          {trade.user}
        </motion.span>
      </td>
    </motion.tr>
);
