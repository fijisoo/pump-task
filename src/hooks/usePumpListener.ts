import { useEffect, useRef } from "react";
import { Connection, Keypair } from "@solana/web3.js";
import { PumpFunSDK } from "pumpdotfun-sdk";
import { AnchorProvider } from "@coral-xyz/anchor";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import type { Trade } from "@/ui/TradeList/TradeRow.tsx";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  fetchDigitalAsset,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";
import { publicKey } from "@metaplex-foundation/umi";

const fetchMetadata = async (mintAddress2: string) => {
  const umi = createUmi(import.meta.env.VITE_APP_HELIUS_RPC_URL).use(
    mplTokenMetadata(),
  );
  const asset = await fetchDigitalAsset(umi, publicKey(mintAddress2));

  const name = asset.metadata.name;
  const symbol = asset.metadata.symbol;
  const logo = asset.metadata.uri;

  return {
    name,
    symbol,
    logo,
  };
};

export const usePumpListener = (
  mintAddress: string | undefined,
  onTradeReceived: (trade: Trade) => void,
  isStreaming: boolean,
) => {
  const sdkRef = useRef<PumpFunSDK | null>(null);
  const listenerIds = useRef<number[]>([]);

  useEffect(() => {
    if (!isStreaming) {
      sdkRef.current = null;
    }
  }, [isStreaming]);

  useEffect(() => {
    if (!mintAddress || !isStreaming) return;

    let isMounted = true;

    const setupListener = async () => {
      if (!import.meta.env.VITE_APP_HELIUS_RPC_URL) {
        console.error("Please set REACT_APP_HELIUS_RPC_URL in .env file");
        console.error(
          "Example: REACT_APP_HELIUS_RPC_URL=https://mainnet.helius-rpc.com/?api-key=<your api key>",
        );
        console.error("Get one at: https://www.helius.dev");
        return;
      }

      const connection = new Connection(
        import.meta.env.VITE_APP_HELIUS_RPC_URL,
      );
      const wallet = new NodeWallet(Keypair.generate());
      const provider = new AnchorProvider(connection, wallet, {
        commitment: "confirmed",
      });

      const sdk = new PumpFunSDK(provider);

      if (!isMounted) return;
      sdkRef.current = sdk;

      const id = sdk.addEventListener("tradeEvent", async (evt) => {
        if (evt.mint.toString() !== mintAddress) return;

        const { name, symbol, logo } = await fetchMetadata(evt.mint.toString());
        const metaResponse = await fetch(logo);
        const meta = await metaResponse.json();

        const imgUrl = meta.image;

        const trade: Trade = {
          id: crypto.randomUUID(),
          time: new Date().toLocaleTimeString(),
          side: evt?.isBuy ? "BUY" : "SELL",
          amount: Number(evt?.solAmount),
          user: evt?.user.toString(),
          name: name || "",
          symbol: symbol || "",
          logo: imgUrl || "",
        };

        onTradeReceived(trade);
      });

      listenerIds.current.push(id);
    };

    setupListener().catch(console.error);

    return () => {
      isMounted = false;
      if (sdkRef.current) {
        listenerIds.current.forEach((l) =>
          sdkRef.current!.removeEventListener(l),
        );
      }
      listenerIds.current = [];
      sdkRef.current = null;
    };
  }, [mintAddress, isStreaming, onTradeReceived]);
};
