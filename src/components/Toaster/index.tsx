import React from "react";
import style from "./toaster.module.css";

type ToasterProps = {
  message?: string|"Toaster by Josh";
  duration?: number|1000;
}

const ToasterContext = React.createContext({} as ToasterProps);
const ToasterUpdateContext = React.createContext((obj: ToasterProps) => {});

export function toast(){

}

function Toast(){
  return <div className={style.main}>
    <p>{"message"}</p>
  </div>
}

type ToastProviderProps = {
  children?: React.ReactNode;
}

function Toaster({children}:ToastProviderProps){
  const [toastProps, setToastProps] = React.useState({} as ToasterProps);

  const handleUpdate = (obj: ToasterProps) =>{
    setToastProps(prev => prev = obj);
  }

  return <ToasterContext.Provider value={toastProps}>
    <ToasterUpdateContext.Provider value={handleUpdate}>
      {children}
    </ToasterUpdateContext.Provider>
  </ToasterContext.Provider>
}

export default Toaster;