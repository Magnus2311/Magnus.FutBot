import { HubConnection } from "@microsoft/signalr";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { Button, Form, FormControl, FormLabel } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { BuyAndSellCardDTO, Card } from "../../models/models";
import { ChemistrySelect } from "../common/Filters/ChemistrySelect";
import { LeagueSelect } from "../common/Filters/LeagueSelect";
import { NationallitySelect } from "../common/Filters/NationallitySelect";
import { PositionSelect } from "../common/Filters/PositionSelect";
import { QualitySelect } from "../common/Filters/QualitySelect";
import { RaritySelect } from "../common/Filters/RaritySelect";
import { Select } from "../common/Select";
import { Switch } from "../common/Switch";
import { onProfilesRequests, selectProfiles } from "../profiles/profileActions";
import { getCardsConnection } from "./buyActions";
import { CardRow } from "./CardRow";
import { SelectCardIndex } from "./SelectCardIndex";
import { useLocation } from "react-router";

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
    incomingBuySellPlayer && incomingBuySellPlayer.email
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

  const handleProfileSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedProfile(e.target.value);
  };

  const handleQualitySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setQuality(e.target.value);
  };

  const handleRaritySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setRarity(e.target.value);
  };

  const handlePositionSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setPosition(e.target.value);
  };

  const handleChemistrySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setChemistry(e.target.value);
  };

  const handleNationallitySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setNationallity(e.target.value);
  };

  const handleLeagueSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setLeague(e.target.value);
  };

  useEffect(() => {
    getCardsConnection(dispatch).then((connection) => {
      setConnection(connection);
      console.log(123);
    });
    dispatch(onProfilesRequests());
  }, [dispatch]);

  return (
    <Form
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
      <Form.Group style={{ marginTop: "10px", textAlign: "left" }}>
        <Form.Label>Select profile to trade for</Form.Label>
        <Select
          items={profiles.map((profile) => profile.email)}
          handleSelect={handleProfileSelect}
          value={selectedProfile ?? ""}
        />
      </Form.Group>
      <Form.Group style={{ marginTop: "10px", textAlign: "left" }}>
        <Form.Label>Select quality</Form.Label>
        <QualitySelect handleSelect={handleQualitySelect} value={quality} />
      </Form.Group>
      <Form.Group style={{ marginTop: "10px", textAlign: "left" }}>
        <Form.Label>Select rarity:</Form.Label>
        <RaritySelect handleSelect={handleRaritySelect} value={rarity} />
      </Form.Group>
      <Form.Group style={{ marginTop: "10px", textAlign: "left" }}>
        <Form.Label>Select position:</Form.Label>
        <PositionSelect handleSelect={handlePositionSelect} value={position} />
      </Form.Group>
      <Form.Group style={{ marginTop: "10px", textAlign: "left" }}>
        <Form.Label>Select chemistry:</Form.Label>
        <ChemistrySelect
          handleSelect={handleChemistrySelect}
          value={chemistry}
        />
      </Form.Group>
      <Form.Group style={{ marginTop: "10px", textAlign: "left" }}>
        <Form.Label>Select nationallity:</Form.Label>
        <NationallitySelect
          handleSelect={handleNationallitySelect}
          value={nationallity}
        />
      </Form.Group>
      <Form.Group style={{ marginTop: "10px", textAlign: "left" }}>
        <Form.Label>Select league:</Form.Label>
        <LeagueSelect handleSelect={handleLeagueSelect} value={league} />
      </Form.Group>
      <Form.Group style={{ marginTop: "10px", textAlign: "left" }}>
        <FormLabel>Max player price: </FormLabel>
        <FormControl
          value={buySellPlayer.price}
          onChange={(e) =>
            setBuyPlayer({ ...buySellPlayer, price: parseInt(e.target.value) })
          }
        />
      </Form.Group>
      <Form.Group style={{ marginTop: "10px", textAlign: "left" }}>
        <FormLabel>Player count: </FormLabel>
        <FormControl
          value={buySellPlayer.count}
          onChange={(e) =>
            setBuyPlayer({ ...buySellPlayer, count: parseInt(e.target.value) })
          }
        />
      </Form.Group>
      <Form.Group style={{ marginTop: "10px", textAlign: "left" }}>
        <FormLabel>Is it bin (Buy-in-Now): </FormLabel>
        <Switch
          label=""
          isChecked={buySellPlayer.isBin}
          setIsChecked={() =>
            setBuyPlayer({ ...buySellPlayer, isBin: !buySellPlayer.isBin })
          }
        />
      </Form.Group>
      <Form.Group style={{ marginTop: "10px", textAlign: "left" }}>
        <FormLabel>Lowest BID price:</FormLabel>
        <FormControl
          autoFocus
          value={buySellPlayer.fromBid}
          onChange={(e) =>
            setBuyPlayer({
              ...buySellPlayer,
              fromBid: parseInt(e.target.value),
            })
          }
        />
      </Form.Group>
      <Form.Group style={{ marginTop: "10px", textAlign: "left" }}>
        <FormLabel>Lowest BIN price:</FormLabel>
        <FormControl
          value={buySellPlayer.fromBin}
          onChange={(e) =>
            setBuyPlayer({
              ...buySellPlayer,
              fromBin: parseInt(e.target.value),
            })
          }
        />
      </Form.Group>
      <Form.Group style={{ marginTop: "15px" }}>
        <Button onClick={handleBtnSubmit} style={{ width: "100%" }}>
          Buy Player
        </Button>
      </Form.Group>
    </Form>
  );
};
