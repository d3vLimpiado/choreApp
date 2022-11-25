import React from "react";
import {
  useChoreDelete,
  useChoreUpdate,
  type ChoreListProps,
} from "../../context/ChoreProvider";
import styles from "./clist.module.css";

type Props = {
  choreObj: ChoreListProps;
};

function List({ choreObj }: Props) {
  const [choreInput, setChoreInput] = React.useState(choreObj.chore);
  const choreInputRef = React.useRef<HTMLInputElement>(null);
  const updateChore = useChoreUpdate();
  const deletChore = useChoreDelete();

  React.useEffect(() => {
    const focusOut = () => {
      let choreTemp = choreObj;
      choreTemp.chore = choreInput;
      choreTemp.updatedAt = new Date();
      updateChore(choreTemp);
    };
    choreInputRef.current?.addEventListener("blur", focusOut);
    return () => {
      choreInputRef.current?.removeEventListener("blur", focusOut);
    };
  }, [choreInput]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    setChoreInput(evt.target.value);
  };

  return (
    <li>
      <span>
        <input
          type="checkbox"
          defaultChecked={false}
          onChange={(evt) => {
            let choreTemp = choreObj;
            choreTemp.state = evt.target.checked;
            updateChore(choreTemp);
          }}
        />
        <input
          ref={choreInputRef}
          type="text"
          value={choreInput}
          onChange={handleChange}
          className={styles.choreLiInput}
          data-chore-state={choreObj.state}
        />
      </span>
      <button
        onClick={() => {
          deletChore(choreObj.id);
        }}
      >
        DELETE
      </button>
    </li>
  );
}

export default List;
