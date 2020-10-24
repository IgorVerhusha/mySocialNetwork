import React, {useState, useEffect, ChangeEvent} from "react";
type Props = {
  status: string
  updateStatus: (status:string) =>(void)
}


const ProfileStatus: React.FC<Props> = (props) => {
  const [status, setStatus] = useState(props.status);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };
  return (
    <div>
      {!editMode ? (
        <div>
          <span onDoubleClick={activateEditMode}>
            {props.status || "-----"}{" "}
          </span>
        </div>
      ) : (
        <div >
          <input
              autoFocus={true}
              onBlur={deactivateEditMode}
            value={status}
            onChange={onStatusChange}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileStatus;
