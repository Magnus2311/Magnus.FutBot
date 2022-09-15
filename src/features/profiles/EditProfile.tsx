import { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Spinner,
} from "react-bootstrap";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ProfileDTO } from "../../models/models";
import {
  getProfileConnection,
  onProfilesRequests,
  selectProfiles,
} from "./profileActions";

export const EditProfile = () => {
  const { email } = useParams();
  const dispatch = useAppDispatch();
  const profiles = useAppSelector(selectProfiles).profiles;
  const [profile, setProfile] = useState<ProfileDTO | undefined>();
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    setProfile(profiles.find((p) => p.email === email));
    dispatch(onProfilesRequests());
  }, [dispatch, email, profiles]);

  return profile ? (
    <Form>
      <FormGroup>
        <FormLabel>Email:</FormLabel>
        <FormControl disabled readOnly value={email} />
      </FormGroup>

      <FormGroup>
        <FormLabel>Old Password:</FormLabel>
        <FormControl disabled readOnly value={profile.password} />
      </FormGroup>

      <FormGroup>
        <FormLabel>New Password:</FormLabel>
        <FormControl
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
        />
      </FormGroup>

      <Button
        onClick={(e) => {
          e.preventDefault();

          getProfileConnection(dispatch).then((connection) => {
            const editProfileDTO = {
              email: profile.email,
              password: newPassword,
            };

            connection.invoke("EditProfile", editProfileDTO);
          });
        }}
        style={{ marginTop: "10px", width: "100%" }}
      >
        Edit Profile
      </Button>
    </Form>
  ) : (
    <Spinner animation="border" />
  );
};
