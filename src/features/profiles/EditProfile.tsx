import { useEffect, useState } from "react";
import {
  Button,
  TextField,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ProfileDTO } from "../../models/models";
import {
  getProfileConnection,
  onProfilesRequests,
  selectProfiles,
} from "./profileActions";

export const EditProfile = () => {
  const { email } = useParams<{ email: string }>();
  const dispatch = useAppDispatch();
  const profiles = useAppSelector(selectProfiles).profiles;
  const [profile, setProfile] = useState<ProfileDTO | undefined>();
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    setProfile(profiles.find((p) => p.email === email));
    dispatch(onProfilesRequests());
  }, [dispatch, email, profiles]);

  const handleEditProfile = async () => {
    const connection = await getProfileConnection(dispatch);
    const editProfileDTO = {
      email: profile?.email,
      password: newPassword,
    };

    connection.invoke("EditProfile", editProfileDTO);
  };

  return profile ? (
    <Box component="form" sx={{ mt: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Email:</Typography>
        <TextField fullWidth disabled value={email} />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Old Password:</Typography>
        <TextField fullWidth disabled value={profile.password} />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">New Password:</Typography>
        <TextField
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={(e) => {
          e.preventDefault();
          handleEditProfile();
        }}
        sx={{ mt: 2 }}
      >
        Edit Profile
      </Button>
    </Box>
  ) : (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <CircularProgress />
    </Box>
  );
};
