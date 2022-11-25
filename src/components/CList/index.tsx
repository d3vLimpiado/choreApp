import {
  useChoreList
} from "../../context/ChoreProvider";
import List from "./List";
import styles from "./clist.module.css";

function CList() {
  const choreList = useChoreList();

  return (
    <>
      {choreList.length ? (
        <ul className={styles.choreUl}>
          {choreList.map((choreObj) => (
            <List key={choreObj.id} choreObj={choreObj} />
          ))}
        </ul>
      ) : (
        <h1>No chores created yet.</h1>
      )}
    </>
  );
}

export default CList;
