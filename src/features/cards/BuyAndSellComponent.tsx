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
import { BuyAndSellCardDTO, Card } from "../../models/models";
import { ChemistrySelect } from "../common/Filters/ChemistrySelect";
import { LeagueSelect } from "../common/Filters/LeagueSelect";
import { NationalitySelect } from "../common/Filters/NationallitySelect";
import { PositionSelect } from "../common/Filters/PositionSelect";
import { QualitySelect } from "../common/Filters/QualitySelect";
import { RaritySelect } from "../common/Filters/RaritySelect";
import { onProfilesRequests, selectProfiles } from "../profiles/profileActions";
import { getCardsConnection } from "./buyActions";
import { CardRow } from "./CardRow";
import { SelectCardIndex } from "./SelectCardIndex";
import { useLocation } from "react-router";
import { Select } from "../common/Select";

interface NavigationState {
  buySellPlayerInc?: BuyAndSellCardDTO;
}

export const BuyAndSellComponent = () => {
  const locationState = useLocation().state as NavigationState;
  const incomingBuySellPlayer = locationState?.buySellPlayerInc;

  const [card, setCard] = useState<Card | undefined>(
    incomingBuySellPlayer?.card
  );

  const [buySellPlayer, setBuyPlayer] = useState<BuyAndSellCardDTO>({
    card: undefined,
    quality: "Any",
    rarity: "Any",
    position: "Any",
    chemistry: "Any",
    nationallity: "Any",
    email: "",
    isBin: false,
    count: 0,
    price: 0,
    fromBid: 0,
    fromBin: 0,
    toBid: 0,
    toBin: 0,
    ...incomingBuySellPlayer,
  });

  const [connection, setConnection] = useState<HubConnection | undefined>();
  const dispatch = useAppDispatch();
  const profiles = useAppSelector(selectProfiles).profiles;
  const [selectedProfile, setSelectedProfile] = useState(
    (incomingBuySellPlayer && incomingBuySellPlayer.email) ||
      (profiles && profiles[0] ? profiles[0].email : "")
  );
  const [quality, setQuality] = useState("Any");
  const [rarity, setRarity] = useState("Any");
  const [position, setPosition] = useState("Any");
  const [chemistry, setChemistry] = useState("Any");
  const [nationallity, setNationallity] = useState("Any");
  const [league, setLeague] = useState("Any");

  const handleBtnSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const buyCardDTO = {
      ...buySellPlayer,
      email: selectedProfile ?? profiles[0]?.email,
      card,
      rarity,
      quality,
      position,
      chemistry,
      nationallity,
      league,
    };

    connection?.invoke("BuyAndSell", buyCardDTO);
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
    getCardsConnection(dispatch).then((connection) => {
      setConnection(connection);
    });
    dispatch(onProfilesRequests());
  }, [dispatch]);

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
                checked={buySellPlayer.isBin}
                onChange={() =>
                  setBuyPlayer({
                    ...buySellPlayer,
                    isBin: !buySellPlayer.isBin,
                  })
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
              value={buySellPlayer.price}
              onChange={(e) =>
                setBuyPlayer({
                  ...buySellPlayer,
                  price: parseInt(e.target.value),
                })
              }
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <FormLabel>Player count</FormLabel>
            <TextField
              value={buySellPlayer.count}
              onChange={(e) =>
                setBuyPlayer({
                  ...buySellPlayer,
                  count: parseInt(e.target.value),
                })
              }
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <FormLabel>Lowest BID price</FormLabel>
            <TextField
              value={buySellPlayer.fromBid}
              onChange={(e) =>
                setBuyPlayer({
                  ...buySellPlayer,
                  fromBid: parseInt(e.target.value),
                })
              }
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <FormLabel>Lowest BIN price</FormLabel>
            <TextField
              value={buySellPlayer.fromBin}
              onChange={(e) =>
                setBuyPlayer({
                  ...buySellPlayer,
                  fromBin: parseInt(e.target.value),
                })
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
