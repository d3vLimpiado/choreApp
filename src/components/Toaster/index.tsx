import style from "./toaster.module.css";

type ToasterProps = {
  message?: string;
}

// export function toast(){

// }

function Toaster({message = "Personal Toaster by Josh"}: ToasterProps){
  return <div className={style.main}>
    <p>{message}</p>
  </div>
}

export default Toaster;