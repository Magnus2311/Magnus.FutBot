import { HubConnection } from "@microsoft/signalr";
import { ChangeEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Select } from "../common/Select";
import { getActionsConnection } from "../profiles/actions/tradeActions";
import { onProfilesRequests, selectProfiles } from "../profiles/profileActions";

export const PauseAction = () => {
  const profiles = useAppSelector(selectProfiles).profiles;
  const dispatch = useAppDispatch();

  const [selectedProfile, setSelectedProfile] = useState(
    profiles.length > 0 ? profiles[0].email : undefined
  );

  const [selectedDuration, setSelectedDuration] = useState("1 Hour");

  const [connection, setConnection] = useState<HubConnection | undefined>();

  useEffect(() => {
    dispatch(onProfilesRequests());
    getActionsConnection(dispatch).then((connection) => {
      setConnection(connection);
    });
  });

  const handleProfileSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedProfile(e.target.value);
  };

  const handleDurationSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDuration(e.target.value);
  };

  return (
    <Form>
      <Form.Group style={{ marginTop: "10px", textAlign: "left" }}>
        <Form.Label>Select profile to pause</Form.Label>
        <Select
          items={profiles.map((profile) => profile.email)}
          handleSelect={handleProfileSelect}
          value={selectedProfile ?? ""}
        />
      </Form.Group>
      <Form.Group style={{ marginTop: "10px", textAlign: "left" }}>
        <Form.Label>Select pause period</Form.Label>
        <Select
          items={["1 Hour", "3 Hours", "6 Hours", "12 Hours", "1 Day"]}
          handleSelect={handleDurationSelect}
          value={selectedDuration}
        />
      </Form.Group>
      <Form.Group style={{ marginTop: "15px" }}>
        <Button
          onClick={() => {
            connection?.invoke(
              "PauseProfile",
              selectedProfile,
              selectedDuration
            );
          }}
          style={{ width: "100%" }}
        >
          Pause Profile
        </Button>
      </Form.Group>
    </Form>
  );
};
