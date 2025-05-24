import { useState } from "react";
import { Input } from "@/ui";

import { Play, Square, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AppLayout } from "@/layout/AppLayout.tsx";
import { TradeListContainer } from "@/containers/TradeListContainer.tsx";

function App() {
  const [mintAddress, setMintAddress] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const toggleStreaming = () => {
    if (isStreaming) {
      setIsStreaming(false);
    } else {
      if (mintAddress.trim()) {
        setIsStreaming(true);
      }
    }
  };

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-6"
      >
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Solana Mint Address
            </label>
            <Input
              type="text"
              placeholder="Paste Solana mint address here..."
              value={mintAddress}
              onChange={(e: any) => setMintAddress(e.target.value)}
              className="font-mono text-sm"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <motion.button
                onClick={toggleStreaming}
                disabled={!mintAddress.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg font-medium
                  transition-colors duration-200
                  ${
                    isStreaming
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-primary hover:bg-orange-600 text-white"
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                <motion.div
                  animate={{ rotate: isStreaming ? 0 : 360 }}
                  transition={{ duration: 0.3 }}
                >
                  {isStreaming ? (
                    <Square className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </motion.div>
                {isStreaming ? "Stop Stream" : "Start Stream"}
              </motion.button>

              <AnimatePresence>
                {isStreaming && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2"
                  >
                    <motion.div
                      className="w-2 h-2 bg-green-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 1.5,
                      }}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Live streaming...
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <TradeListContainer mintAddress={mintAddress} isStreaming={isStreaming} />

      {!isStreaming && (
        <div className="text-center py-12">
          <TrendingUp className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No trades yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Enter a Solana mint address and start streaming to see live trades
          </p>
        </div>
      )}
    </AppLayout>
  );
}

export default App;
