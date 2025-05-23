import React, { useEffect } from 'react';
import { Connection, Keypair } from "@solana/web3.js";
import { PumpFunSDK } from "pumpdotfun-sdk";
import { AnchorProvider } from "@coral-xyz/anchor";
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';

const PumpListener: React.FC = () => {
  useEffect(() => {
    const setupPumpListener = async () => {
      if (!import.meta.env.VITE_APP_HELIUS_RPC_URL) {
        console.error("Please set REACT_APP_HELIUS_RPC_URL in .env file");
        console.error(
          "Example: REACT_APP_HELIUS_RPC_URL=https://mainnet.helius-rpc.com/?api-key=<your api key>"
        );
        console.error("Get one at: https://www.helius.dev");
        return;
      }

      const connection = new Connection(import.meta.env.VITE_APP_HELIUS_RPC_URL);
      const wallet = new NodeWallet(Keypair.generate());
      const provider = new AnchorProvider(connection, wallet, {
        commitment: "confirmed",
      });

      const sdk = new PumpFunSDK(provider);

      return () => {
      };
    };

    setupPumpListener();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <h2>Pump Trade Listener</h2>
      <p>Listening for Pump trades... Check console for events.</p>
    </div>
  );
};

export default PumpListener; 