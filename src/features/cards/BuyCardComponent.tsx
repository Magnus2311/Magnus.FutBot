import { HubConnection } from "@microsoft/signalr";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  Switch,
  TextField,
  FormControlLabel,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { BuyCardDTO as BuyCard, BuyCardDTO, Card } from "../../models/models";
import { ChemistrySelect } from "../common/Filters/ChemistrySelect";
import { LeagueSelect } from "../common/Filters/LeagueSelect";
import { NationalitySelect } from "../common/Filters/NationallitySelect";
import { PositionSelect } from "../common/Filters/PositionSelect";
import { QualitySelect } from "../common/Filters/QualitySelect";
import { RaritySelect } from "../common/Filters/RaritySelect";
import { Select } from "../common/Select";
import { onProfilesRequests, selectProfiles } from "../profiles/profileActions";
import { getCardsConnection } from "./buyActions";
import { CardRow } from "./CardRow";
import { SelectCardIndex } from "./SelectCardIndex";
import { useLocation } from "react-router-dom";

interface NavigationState {
  buyCardDTO?: BuyCardDTO;
}

export const BuyCardComponent = () => {
  const locationState = useLocation().state as NavigationState;
  const incomingBuyPlayerDTO = locationState?.buyCardDTO;
  const [card, setCard] = useState<Card | undefined>(
    incomingBuyPlayerDTO?.card
  );

  const [buyPlayer, setBuyPlayer] = useState<BuyCard>({
    card: card,
    quality: "Any",
    rarity: "Any",
    position: "Any",
    chemistry: "Any",
    nationallity: "Any",
    email: "",
    isBin: false,
    count: 0,
    price: 0,
    ...incomingBuyPlayerDTO,
  });

  const profiles = useAppSelector(selectProfiles).profiles;

  const [selectedProfile, setSelectedProfile] = useState(
    (incomingBuyPlayerDTO && incomingBuyPlayerDTO.email) ||
      (profiles && profiles[0] ? profiles[0].email : "")
  );

  const [connection, setConnection] = useState<HubConnection | undefined>();
  const dispatch = useAppDispatch();
  const [quality, setQuality] = useState("Any");
  const [rarity, setRarity] = useState("Any");
  const [position, setPosition] = useState("Any");
  const [chemistry, setChemistry] = useState("Any");
  const [nationallity, setNationallity] = useState("Any");
  const [league, setLeague] = useState("Any");

  useEffect(() => {
    getCardsConnection(dispatch).then((connection) =>
      setConnection(connection)
    );
    dispatch(onProfilesRequests());
  }, [dispatch]);

  const handleBtnSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const buyCardDTO = {
      ...buyPlayer,
      email: selectedProfile ?? profiles[0]?.email,
      card,
      rarity,
      quality,
      position,
      chemistry,
      nationallity,
      league,
    };

    connection?.invoke("BuyCard", buyCardDTO);
  };

  const handleProfileSelect = (e: ChangeEvent<{ value: unknown }>) => {
    setSelectedProfile(e.target.value as string);
  };

  const handleQualitySelect = (e: ChangeEvent<{ value: unknown }>) => {
    setQuality(e.target.value as string);
  };

  const handleRaritySelect = (e: ChangeEvent<{ value: unknown }>) => {
    setRarity(e.target.value as string);
  };

  const handlePositionSelect = (e: ChangeEvent<{ value: unknown }>) => {
    setPosition(e.target.value as string);
  };

  const handleChemistrySelect = (e: ChangeEvent<{ value: unknown }>) => {
    setChemistry(e.target.value as string);
  };

  const handleNationallitySelect = (e: ChangeEvent<{ value: unknown }>) => {
    setNationallity(e.target.value as string);
  };

  const handleLeagueSelect = (e: ChangeEvent<{ value: unknown }>) => {
    setLeague(e.target.value as string);
  };

  useEffect(() => {
    profiles && profiles[0] && setSelectedProfile(profiles[0].email);
  }, [profiles]);

  return (
    <form
      style={{
        width: "clamp(400px, 60%, 100%)",
        textAlign: "center",
      }}
    >
      {card ? (
        <CardRow
          key={card.cardId}
          card={card}
          onSelectCard={() => setCard(undefined)}
          isRemoveable={true}
        />
      ) : (
        <SelectCardIndex selectCard={setCard} />
      )}

      <Grid
        container
        spacing={2}
        style={{ marginTop: "10px", textAlign: "left" }}
      >
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Select
              items={profiles.map((p) => p.email)}
              handleSelect={handleProfileSelect}
              value={selectedProfile ?? ""}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <QualitySelect handleSelect={handleQualitySelect} value={quality} />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <RaritySelect handleSelect={handleRaritySelect} value={rarity} />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <PositionSelect
              handleSelect={handlePositionSelect}
              value={position}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <ChemistrySelect
              handleSelect={handleChemistrySelect}
              value={chemistry}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <NationalitySelect
              handleSelect={handleNationallitySelect}
              value={nationallity}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <LeagueSelect handleSelect={handleLeagueSelect} value={league} />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} sx={{ marginTop: "20px" }}>
          <FormControlLabel
            control={
              <Switch
                checked={buyPlayer.isBin}
                onChange={() =>
                  setBuyPlayer({ ...buyPlayer, isBin: !buyPlayer.isBin })
                }
              />
            }
            label="Is it BIN (Buy Now)"
            labelPlacement="start"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <FormLabel>Max player price</FormLabel>
            <TextField
              value={buyPlayer.price}
              onChange={(e) =>
                setBuyPlayer({ ...buyPlayer, price: parseInt(e.target.value) })
              }
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <FormLabel>Player count</FormLabel>
            <TextField
              value={buyPlayer.count}
              onChange={(e) =>
                setBuyPlayer({ ...buyPlayer, count: parseInt(e.target.value) })
              }
            />
          </FormControl>
        </Grid>
      </Grid>

      <Button
        onClick={handleBtnSubmit}
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: "15px" }}
      >
        Buy Player
      </Button>
    </form>
  );
};
