import style from "./toaster.module.css";

type ToasterProps = {
  message?: string;
}

function Toaster({message = "Personal Toaster by Josh"}: ToasterProps){
  return <div className={style.main}>
    <p>{message}</p>
    <span className={style.bar}></span>
  </div>
}

export default Toaster;