import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  FunctionComponent,
} from 'react';

export const ViewportContext = createContext<{
  width: number | undefined;
  height: number | undefined;
}>({ width: 0, height: 0 });

type ViewPortProps = {
  width?: number;
  height?: number;
};

export const ViewportProvider: FunctionComponent<ViewPortProps> = ({
  children,
}) => {
  const [width, setWidth]: [
    width: number | undefined,
    setWidth: React.Dispatch<React.SetStateAction<number | undefined>>
  ] = useState();
  const [height, setHeight]: [
    height: number | undefined,
    setWidth: React.Dispatch<React.SetStateAction<number | undefined>>
  ] = useState();

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  /* Returning the width and height we store the values in the
     value of the Provider */
  return (
    <ViewportContext.Provider value={{ width, height }}>
      {children}
    </ViewportContext.Provider>
  );
};

export const useViewport = () => {
  /* We can use the "useContext" Hook to access a context from within
  another Hook, remember, Hooks are composable! */
  const { width, height } = useContext(ViewportContext);
  return { width, height };
};
