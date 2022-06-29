import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  pendingStatusAction,
  selectPlayers,
  setupEventsHub,
} from "./playersActions";

const PlayersIndex = () => {
  const dispatch = useAppDispatch();
  const playersState = useAppSelector(selectPlayers);

  useEffect(() => {
    dispatch(pendingStatusAction());

    setupEventsHub(dispatch).then((connection) => {
      connection.invoke("GetPlayers");
    });
  }, [dispatch]);

  return (
    <>
      {playersState.status === "idle" ? (
        playersState.players.map((player) => {
          return (
            <div key={player.id}>
              <span>{player.name}</span>
              <span>{player.rating}</span>
            </div>
          );
        })
      ) : (
        <Spinner
          animation="border"
          variant="primary"
          style={{ height: "64px", width: "64px" }}
        />
      )}
    </>
  );
};

export default PlayersIndex;
