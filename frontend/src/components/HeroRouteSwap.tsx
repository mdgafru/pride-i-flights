"use client";

import { useReducer, useState } from "react";
import { SwapRoutesIcon } from "@/components/icons";

const fieldLabelClass = "text-sm text-slate-500";
const fieldInputClass =
  "mt-1 w-full min-w-0 border-0 bg-transparent p-0 text-[15px] font-semibold text-[#0b2f57] outline-none placeholder:font-normal placeholder:text-slate-400";

type RouteState = { from: string; to: string };

type RouteAction =
  | { type: "setFrom"; value: string }
  | { type: "setTo"; value: string }
  | { type: "swap" };

function routeReducer(state: RouteState, action: RouteAction): RouteState {
  switch (action.type) {
    case "setFrom":
      return { ...state, from: action.value };
    case "setTo":
      return { ...state, to: action.value };
    case "swap":
      return { from: state.to, to: state.from };
    default:
      return state;
  }
}

export function HeroRouteSwap() {
  const [route, dispatch] = useReducer(routeReducer, { from: "", to: "" });
  const [swapRotation, setSwapRotation] = useState(0);

  const swapRoute = () => {
    dispatch({ type: "swap" });
    setSwapRotation((prev) => prev + 180);
  };

  return (
    <div className="flex min-h-[82px] min-w-0 items-stretch border-b border-slate-200 sm:col-span-2 sm:border-r sm:border-b-0 lg:col-span-1">
      <label className="flex min-w-0 flex-1 flex-col justify-center px-4 py-4 sm:px-5">
        <span className={fieldLabelClass}>From</span>
        <input
          type="text"
          name="from"
          autoComplete="off"
          value={route.from}
          onChange={(e) => dispatch({ type: "setFrom", value: e.target.value })}
          placeholder="Country, city or airport"
          className={fieldInputClass}
        />
      </label>

      <div className="flex w-[3.75rem] shrink-0 items-center justify-center sm:w-16">
        <button
          type="button"
          aria-label="Swap departure and destination"
          title="Swap From and To"
          className="hero-route-swap flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-[#0b2f57] bg-white text-[#0b2f57] shadow-sm hover:border-[#e30613] hover:text-[#e30613]"
          style={{ transform: `rotate(${swapRotation}deg)` }}
          onClick={swapRoute}
        >
          <SwapRoutesIcon className="pointer-events-none h-4 w-4" />
        </button>
      </div>

      <label className="flex min-w-0 flex-1 flex-col justify-center px-4 py-4 sm:px-5">
        <span className={fieldLabelClass}>To</span>
        <input
          type="text"
          name="to"
          autoComplete="off"
          value={route.to}
          onChange={(e) => dispatch({ type: "setTo", value: e.target.value })}
          placeholder="Country, city or airport"
          className={fieldInputClass}
        />
      </label>
    </div>
  );
}
