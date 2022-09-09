import { FormEvent, useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormLabel,
  FormText,
} from "react-bootstrap";
import { BuyPlayer, PlayerCard } from "../../models/models";
import { Switch } from "../common/Switch";
import { CardRow } from "./CardRow";

interface Props {
  card: PlayerCard;
  onDeselect: () => void;
}

export const BuyCard = ({ card, onDeselect }: Props) => {
  const [buyPlayer, setBuyPlayer] = useState<BuyPlayer>({
    card: card,
    isBin: false,
    count: "",
    price: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Form
      style={{
        width: "clamp(400px, 60%, 100%)",
        textAlign: "center",
      }}
      onSubmit={handleSubmit}
    >
      <CardRow
        key={card.cardId}
        card={card}
        onSelectCard={onDeselect}
        isRemoveable={true}
      />
      <div style={{ marginTop: "10px", textAlign: "left" }}>
        <FormLabel>Max player price: </FormLabel>
        <FormControl
          autoFocus
          value={buyPlayer.price}
          onChange={(e) =>
            setBuyPlayer({ ...buyPlayer, price: e.target.value })
          }
        />
      </div>
      <div style={{ marginTop: "10px", textAlign: "left" }}>
        <FormLabel>Player count: </FormLabel>
        <FormControl
          value={buyPlayer.count}
          onChange={(e) =>
            setBuyPlayer({ ...buyPlayer, count: e.target.value })
          }
        />
      </div>
      <div style={{ marginTop: "10px", textAlign: "left" }}>
        <FormLabel>Is it bin (Buy-in-Now): </FormLabel>
        <Switch
          label=""
          isChecked={buyPlayer.isBin}
          setIsChecked={() =>
            setBuyPlayer({ ...buyPlayer, isBin: !buyPlayer.isBin })
          }
        />
      </div>
      <div style={{ marginTop: "15px" }}>
        <Button style={{ width: "100%" }}>Buy Player</Button>
      </div>
    </Form>
  );
};
