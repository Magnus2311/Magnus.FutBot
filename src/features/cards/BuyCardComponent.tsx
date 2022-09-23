import { HubConnection } from "@microsoft/signalr";
import { strictEqual } from "assert";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { Button, Form, FormControl, FormLabel } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { BuyPlayer as BuyCard, Card } from "../../models/models";
import { QualitySelect } from "../common/Filters/qualitySelect";
import { Select } from "../common/Select";
import { Switch } from "../common/Switch";
import { onProfilesRequests, selectProfiles } from "../profiles/profileActions";
import { getCardsConnection } from "./buyActions";
import { CardRow } from "./CardRow";

interface Props {
  card: Card;
  onDeselect: () => void;
}

export const BuyCardComponent = ({ card, onDeselect }: Props) => {
  const [buyPlayer, setBuyPlayer] = useState<BuyCard>({
    card: card,
    isBin: false,
    count: 0,
    price: 0,
  });

  // test commit
  const [connection, setConnection] = useState<HubConnection | undefined>();
  const dispatch = useAppDispatch();
  const profiles = useAppSelector(selectProfiles).profiles;
  const [selectedProfile, setSelectedProfile] = useState(
    profiles.length > 0 ? profiles[0].email : ""
  );
  const [quality, setQuality] = useState("any");

  useEffect(() => {
    getCardsConnection(dispatch).then((connection) =>
      setConnection(connection)
    );
    dispatch(onProfilesRequests());
  }, [dispatch]);

  const handleBtnSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const buyCardDTO = { ...buyPlayer, email: selectedProfile };

    connection?.invoke("BuyCard", buyCardDTO);
  };

  const handleProfileSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedProfile(e.target.value);
  };

  const handleQualitySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setQuality(e.target.value);
  };

  return (
    <Form
      style={{
        width: "clamp(400px, 60%, 100%)",
        textAlign: "center",
      }}
    >
      <CardRow
        key={card.cardId}
        card={card}
        onSelectCard={onDeselect}
        isRemoveable={true}
      />
      <Form.Group style={{ marginTop: "10px", textAlign: "left" }}>
        <Form.Label>Select profile to trade for</Form.Label>
        <Select
          items={profiles.map((profile) => profile.email)}
          handleSelect={handleProfileSelect}
          value={selectedProfile}
        />
      </Form.Group>
      <Form.Group style={{ marginTop: "10px", textAlign: "left" }}>
        <Form.Label>Select quality</Form.Label>
        <QualitySelect handleSelect={handleQualitySelect} value={quality} />
      </Form.Group>
      <Form.Group style={{ marginTop: "10px", textAlign: "left" }}>
        <FormLabel>Max player price: </FormLabel>
        <FormControl
          autoFocus
          value={buyPlayer.price}
          onChange={(e) =>
            setBuyPlayer({ ...buyPlayer, price: parseInt(e.target.value) })
          }
        />
      </Form.Group>
      <Form.Group style={{ marginTop: "10px", textAlign: "left" }}>
        <FormLabel>Player count: </FormLabel>
        <FormControl
          value={buyPlayer.count}
          onChange={(e) =>
            setBuyPlayer({ ...buyPlayer, count: parseInt(e.target.value) })
          }
        />
      </Form.Group>
      <Form.Group style={{ marginTop: "10px", textAlign: "left" }}>
        <FormLabel>Is it bin (Buy-in-Now): </FormLabel>
        <Switch
          label=""
          isChecked={buyPlayer.isBin}
          setIsChecked={() =>
            setBuyPlayer({ ...buyPlayer, isBin: !buyPlayer.isBin })
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
