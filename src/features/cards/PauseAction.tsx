import { HubConnection } from "@microsoft/signalr";
import { ChangeEvent, useEffect, useState } from "react";
import { Button, MenuItem, TextField, Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getActionsConnection } from "../profiles/actions/tradeActions";
import { onProfilesRequests, selectProfiles } from "../profiles/profileActions";

export const PauseAction = () => {
  const profiles = useAppSelector(selectProfiles).profiles;
  const dispatch = useAppDispatch();

  const [selectedProfile, setSelectedProfile] = useState<string | undefined>(
    profiles.length > 0 ? profiles[0].email : undefined
  );

  const [selectedDuration, setSelectedDuration] = useState("1 Hour");

  const [connection, setConnection] = useState<HubConnection | undefined>();

  useEffect(() => {
    dispatch(onProfilesRequests());
    getActionsConnection(dispatch).then((connection) => {
      setConnection(connection);
    });
  }, [dispatch]);

  const handleProfileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedProfile(e.target.value);
  };

  const handleDurationSelect = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedDuration(e.target.value);
  };

  return (
    <Box component="form" sx={{ mt: 2 }}>
      <Box sx={{ mb: 2, textAlign: "left" }}>
        <TextField
          select
          label="Select profile to pause"
          value={selectedProfile ?? ""}
          onChange={handleProfileSelect}
          fullWidth
        >
          {profiles.map((profile) => (
            <MenuItem key={profile.email} value={profile.email}>
              {profile.email}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box sx={{ mb: 2, textAlign: "left" }}>
        <TextField
          select
          label="Select pause period"
          value={selectedDuration}
          onChange={handleDurationSelect}
          fullWidth
        >
          {["1 Hour", "3 Hours", "6 Hours", "12 Hours", "1 Day"].map(
            (duration) => (
              <MenuItem key={duration} value={duration}>
                {duration}
              </MenuItem>
            )
          )}
        </TextField>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          onClick={() => {
            connection?.invoke(
              "PauseProfile",
              selectedProfile,
              selectedDuration
            );
          }}
          fullWidth
        >
          Pause Profile
        </Button>
      </Box>
    </Box>
  );
};
