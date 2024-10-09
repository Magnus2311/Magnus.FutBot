import { useEffect } from "react";
import { CircularProgress, Box, Typography } from "@mui/material";
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
    <Box>
      {playersState.status === "idle" ? (
        playersState.players.slice(0, 50).map((player) => (
          <Box key={player.id} sx={{ display: "flex", mb: 2 }}>
            <Typography variant="body1" sx={{ flex: 1 }}>
              {player.name}
            </Typography>
            <Typography variant="body1" sx={{ flex: 1 }}>
              {player.rating}
            </Typography>
          </Box>
        ))
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress size={64} />
        </Box>
      )}
    </Box>
  );
};

export default PlayersIndex;
