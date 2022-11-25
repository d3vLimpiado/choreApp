import React from "react";

type ChoreProviderProps = {
  children?: React.ReactNode;
};

export type ChoreListProps = {
  id: string;
  chore: string;
  state: boolean | false;
  createdAt: Date;
  updatedAt: Date;
};

export type ChoreHandler = {
  success: boolean;
  message: string;
};

function createCtx<A extends {} | null>() {
  const ctx = React.createContext<A | undefined>(undefined);
  function useCtx() {
    const c = React.useContext(ctx);
    if (c === undefined)
      throw new Error("useCtx must be inside a Provider with a value");
    return c;
  }
  return [useCtx, ctx.Provider] as const;
}

export const [useChoreList, ChoreListProvider] = createCtx<ChoreListProps[]>();
export const [useChoreAppend, ChoreAppendProvider] =
  createCtx<(choreParam: ChoreListProps) => ChoreHandler>();
export const [useChoreUpdate, ChoreUpdateProvider] =
  createCtx<(choreUpdate:ChoreListProps) => ChoreHandler>();
export const [useChoreDelete, ChoreDeleteProvider] =
  createCtx<(choreId: string) => ChoreHandler>();

function ChoreProvider({ children }: ChoreProviderProps) {
  const [choreList, setChoreList] = React.useState<ChoreListProps[]>([]);

  const handleChoreAppend = (choreParam: ChoreListProps): ChoreHandler => {
    setChoreList((prev) => [...prev, choreParam]);
    return {
      success: true,
      message: `${choreParam.chore} successfully inserted`,
    };
  };
  const handleChoreUpdate = (choreUpdate:ChoreListProps): ChoreHandler => {
    let choreObj = choreList?.find((chore) => chore.id === choreUpdate.id);
    if (!choreObj) {
      return {
        success: false,
        message: "chore not found",
      };
    }
    setChoreList((prev) => {
      return prev?.map((chore) => {
        return chore.id === choreObj?.id ? choreObj : chore;
      });
    });
    return {
      success: true,
      message: "success",
    };
  };
  const handleChoreDelete = (choreId: string): ChoreHandler => {
    let chore = choreList?.find((ch) => ch.id === choreId);
    if (!chore) {
      return {
        success: false,
        message: "chore not found",
      };
    }
    setChoreList((prev) => (prev = prev?.filter((ch) => ch.id !== chore?.id)));
    return {
      success: true,
      message: "success",
    };
  };

  return (
    <ChoreListProvider value={choreList}>
      <ChoreAppendProvider value={handleChoreAppend}>
        <ChoreUpdateProvider value={handleChoreUpdate}>
          <ChoreDeleteProvider value={handleChoreDelete}>
            {children}
          </ChoreDeleteProvider>
        </ChoreUpdateProvider>
      </ChoreAppendProvider>
    </ChoreListProvider>
  );
}

export default ChoreProvider;
