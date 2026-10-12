"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type DecisionStatus =
  | "open"
  | "started"
  | "deferred"
  | "completed"
  | "help";

export type Decision = {
  status: DecisionStatus;
  reason?: string;
  at?: string;
};

type Feed = "loading" | "ready" | "error";

type OperationsContextValue = {
  feed: Feed;
  decisions: Record<string, Decision>;
  record: (
    id: string,
    status: Exclude<DecisionStatus, "open">,
    reason?: string,
  ) => void;
  retry: () => void;
  failFeed: () => void;
};

const OperationsContext = createContext<OperationsContextValue | null>(null);

export function OperationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [feed, setFeed] = useState<Feed>("loading");
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});

  useEffect(() => {
    const timer = window.setTimeout(() => setFeed("ready"), 450);
    return () => window.clearTimeout(timer);
  }, []);

  const value = useMemo<OperationsContextValue>(
    () => ({
      feed,
      decisions,
      record: (id, status, reason) => {
        setDecisions((current) => ({
          ...current,
          [id]: { status, reason, at: new Date().toISOString() },
        }));
      },
      retry: () => {
        setFeed("loading");
        window.setTimeout(() => setFeed("ready"), 450);
      },
      failFeed: () => setFeed("error"),
    }),
    [decisions, feed],
  );

  return (
    <OperationsContext.Provider value={value}>
      {children}
    </OperationsContext.Provider>
  );
}

export function useOperations() {
  const value = useContext(OperationsContext);
  if (!value) {
    throw new Error("OperationsProvider is missing.");
  }
  return value;
}

export function isClosed(status: DecisionStatus | undefined) {
  return status === "completed" || status === "help";
}
