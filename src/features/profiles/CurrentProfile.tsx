import React, { MouseEvent, useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  IconButton,
  Divider,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Switch,
  FormControlLabel,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import { HubConnection } from "@microsoft/signalr";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getCardsConnection } from "../cards/buyActions";
import {
  getProfileConnection,
  onProfilesRequests,
  selectProfiles,
} from "./profileActions";
import { ActionsList } from "./actions/ActionsList";
import TransferCardRow from "./TransferCardRow";
import TransferCardSection from "./TransferCardSection";

export type TransferListKeys =
  | "unassignedItems"
  | "soldItems"
  | "unsoldItems"
  | "availableItems"
  | "activeTransfers";

export const CurrentProfile = () => {
  const [cardsConnection, setCardsConnection] = useState<
    HubConnection | undefined
  >();
  const [profilesConnection, setProfilesConnection] = useState<
    HubConnection | undefined
  >();
  const navigate = useNavigate();
  const { profiles } = useAppSelector(selectProfiles);
  const dispatch = useAppDispatch();
  const { email } = useParams();
  const [profile, setProfile] = useState(
    profiles.find((p) => p.email.toLowerCase() === email?.toLowerCase())
  );
  const [autoRelist, setAutoRelist] = useState(profile?.autoRelist ?? false);

  useEffect(() => {
    getCardsConnection(dispatch).then((connection) =>
      setCardsConnection(connection)
    );
    getProfileConnection(dispatch).then((connection) =>
      setProfilesConnection(connection)
    );
    if (profiles.length === 0) {
      dispatch(onProfilesRequests());
    } else if (profile) {
      // dispatch(onProfileRefreshRequested(currentProfile.id));
    } else {
      const profile = profiles.find(
        (p) => p.email.toLowerCase() === email?.toLowerCase()
      );
      setProfile(profile);
      setAutoRelist(profile!.autoRelist);
    }
  }, [dispatch, profiles.length, profile, email, profiles]);

  const handleTradesRequest = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(`/trades/index/${profile?.email}`);
  };

  const handleRelistAll = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    cardsConnection?.invoke("RelistAllForProfile", profile?.email);
  };

  const transferListMap: Record<string, TransferListKeys> = {
    unassigneditems: "unassignedItems",
    solditems: "soldItems",
    unsolditems: "unsoldItems",
    availableitems: "availableItems",
    activetransfers: "activeTransfers",
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      {/* Profile Information */}
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid
          item
          xs={12}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h4">{profile?.email}</Typography>
          <IconButton onClick={() => navigate(`/profiles/edit/${email}`)}>
            <EditIcon />
          </IconButton>
        </Grid>

        {/* Coins and Status */}
        <Grid item xs={6}>
          <Typography>Coins: {profile?.coins}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Status: {profile?.status}</Typography>
        </Grid>

        {/* Transfer List and Unassigned Items */}
        <Grid item xs={6}>
          <Typography>
            Transfer List:{" "}
            {profile?.tradePile.transferList.activeTransfers.length}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            Unassigned: {profile?.tradePile.unassignedItems.length}
          </Typography>
        </Grid>
      </Grid>

      <Divider style={{ margin: "20px 0" }} />

      {/* Additional Options Accordion */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Additional Options</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControlLabel
            control={
              <Switch
                checked={autoRelist}
                onChange={() => {
                  const newValue = !autoRelist;
                  setAutoRelist(newValue);
                  const profileData = {
                    profileId: profile?.id,
                    autoRelist: newValue,
                  };
                  profilesConnection?.invoke("SetAutoRelist", profileData);
                }}
              />
            }
            label="Relist items every hour"
          />
        </AccordionDetails>
      </Accordion>

      {/* Current Actions Accordion */}
      {profile && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Current Actions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ActionsList profileId={profile.id} />
          </AccordionDetails>
        </Accordion>
      )}

      {/* Action Buttons */}
      <Grid
        container
        justifyContent="center"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleTradesRequest}
          style={{ marginRight: "10px" }} // Add some space between buttons if needed
        >
          Trades
        </Button>
        <Button variant="contained" color="secondary" onClick={handleRelistAll}>
          Relist all
        </Button>
      </Grid>

      {/* Trade Pile Sections */}
      {[
        "Unassigned Items",
        "Sold Items",
        "Unsold Items",
        "Available Items",
        "Active Transfers",
      ].map((sectionTitle) => (
        <TransferCardSection
          email={email!}
          profile={profile!}
          sectionTitle={sectionTitle}
          transferListMap={transferListMap}
        />
      ))}

      {/* Transfer Targets Section */}
      <div style={{ display: "flex", marginTop: "20px" }}>
        <Typography variant="h5" style={{ flex: 2, textAlign: "left" }}>
          Transfer Targets:
        </Typography>
        <Button
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            cardsConnection?.invoke("SendTransferTargetsToTransferList", email);
          }}
        >
          Send to Transfer List
        </Button>
      </div>

      {/* Unassigned Items Section */}
      <div style={{ display: "flex", marginTop: "20px" }}>
        <Typography variant="h5" style={{ flex: 2, textAlign: "left" }}>
          Unassigned items:
        </Typography>
        <Button
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            cardsConnection?.invoke("SendUnassignedItemsToTransferList", email);
          }}
        >
          Send to Transfer List
        </Button>
      </div>
    </Container>
  );
};
