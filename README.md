# Recruitment Task – Pump.fun Trade Listener (React)

## 🏆 Objective

Design and build a small **React** front‑end that connects to the `pumpdotfun-sdk` event stream and shows real‑time trades for any **pump.fun** token the user specifies.

---

## 📚 Background

[pump.fun](https://pump.fun) is a Solana‑based launchpad. The open‑source [`pumpdotfun-sdk`](https://github.com/rckprtr/pumpdotfun-sdk) exposes WebSocket endpoints for trade events, but the documentation is minimal. You will rely on code‑reading and the [`example/events/index.ts`](https://github.com/rckprtr/pumpdotfun-sdk/blob/main/example/events/index.ts) demo.

A starter repository already contains:

* Create‑React‑App (Vite) scaffold in **TypeScript**
* `pumpdotfun-sdk` installed and ready to import

You do **not** need to write any backend code.

To test you can go to [pump.fun](https://pump.fun) and pick any new trending token, then mint address is in URL, like that: https://pump.fun/coin/**4JwVG5kC4aFwT5GkGinRGNverJW6tv5gRNCEg64Upump** 



---

## ✏️ Core Requirements

1. **Mint Input** – Provide a text field where the user can paste a *Solana mint address*.
2. **Live Trade Feed** – After submission, subscribe via `pumpdotfun-sdk` to the trade events for that mint and stream them into the UI without page refreshes.
3. **Trade List View** – Render each incoming trade (time, side, price, amount, buyer, seller…) in a scrolling list or table that updates in real time.

---

## ⭐ Extra Credit (Nice‑to‑Have)

* Fetch and display token **name, symbol, and image** (e.g., via Metaplex metadata or a public RPC/aggregator).
* Highlight buys vs. sells with subtle visual cues.
* Smooth scrolling / auto‑scroll on new trades.
* Responsive design & dark‑mode support.

---

## 🚀 Getting Started

```bash
git clone https://github.com/meltedblocks/pump-task.git
cd pumpfun‑trade‑listener

# Install dependencies
npm install  # or npm / yarn

# Start the dev server
npm run dev
```

---

## 📦 Deliverables

* **Source code** in a public GitHub repo (or a Zip archive).
* A short **README** that explains:

  * Setup & run instructions
  * Design decisions, libraries used
  * What works, what’s missing, known issues

