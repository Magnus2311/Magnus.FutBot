import { MoveActionDTO } from "../../../models/models";
import * as Icon from "react-bootstrap-icons";

interface Props {
  moveAction: MoveActionDTO;
  onActionCancel: () => void;
}

export const MoveAction = ({ moveAction, onActionCancel }: Props) => {
  return (
    <div>
      <Icon.Arrow90degRight size={30} color="blue" />
      Description: {moveAction.description}
      Priority: {moveAction.priority}
      <Icon.XCircleFill
        color="red"
        style={{ marginLeft: 20, cursor: "pointer" }}
        size={30}
        onClick={onActionCancel}
      />
    </div>
  );
};
