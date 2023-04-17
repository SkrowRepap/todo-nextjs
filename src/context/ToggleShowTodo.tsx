import { ReactNode, createContext, useState } from "react";

type ToggleShowTodoContextType = {
  showHidden: boolean;
  toggleShowHidden: () => void;
};

export const ToggleShowTodoContext = createContext<ToggleShowTodoContextType>(
  {} as ToggleShowTodoContextType
);

export const ToggleShowTodoProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [showHidden, setShowHidden] = useState(false);

  const toggleShowHidden = () => {
    setShowHidden(!showHidden);
  };

  return (
    <ToggleShowTodoContext.Provider value={{ showHidden, toggleShowHidden }}>
      {children}
    </ToggleShowTodoContext.Provider>
  );
};
