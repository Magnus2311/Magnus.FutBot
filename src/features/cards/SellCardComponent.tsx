import { HubConnection } from "@microsoft/signalr";
import { MouseEvent, useEffect, useState } from "react";
import { Button, Form, FormControl, FormLabel, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { SellCardDTO } from "../../models/models";
import { getCardsConnection, selectCards } from "./buyActions";
import { CardRow } from "./CardRow";

export const SellCardComponent = () => {
  const [connection, setConnection] = useState<HubConnection | undefined>();
  const { cardId, email } = useParams();
  const cards = useAppSelector(selectCards).cards;
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const [cardToSell] = useState(cards.find((c) => c.cardId === cardId));

  const [sellCard, setSellCard] = useState<SellCardDTO>({
    card: cardToSell!,
    count: 0,
    fromBid: 0,
    fromBin: 0,
  });

  const handleBtnSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const sellCardDTO = { ...sellCard, email: email };
    connection?.invoke("SellCard", sellCardDTO);
  };

  useEffect(() => {
    getCardsConnection(dispatch).then((connection) =>
      setConnection(connection)
    );

    connection?.invoke("GetCards");
  }, [dispatch, connection]);

  return (
    <Form
      style={{
        width: "clamp(400px, 60%, 100%)",
        textAlign: "center",
      }}
    >
      {cardToSell ? (
        <CardRow
          card={cardToSell}
          onSelectCard={() => {
            navigation(-1);
          }}
          isRemoveable={true}
        />
      ) : (
        <Spinner animation="border" />
      )}
      <Form.Group style={{ marginTop: "10px", textAlign: "left" }}>
        <FormLabel>How many cards to sell:</FormLabel>
        <FormControl
          autoFocus
          value={sellCard.count}
          onChange={(e) =>
            setSellCard({ ...sellCard, count: parseInt(e.target.value) })
          }
        />
      </Form.Group>
      <Form.Group style={{ marginTop: "10px", textAlign: "left" }}>
        <FormLabel>Lowest BID price:</FormLabel>
        <FormControl
          autoFocus
          value={sellCard.fromBid}
          onChange={(e) =>
            setSellCard({ ...sellCard, fromBid: parseInt(e.target.value) })
          }
        />
      </Form.Group>
      <Form.Group style={{ marginTop: "10px", textAlign: "left" }}>
        <FormLabel>Lowest BIN price:</FormLabel>
        <FormControl
          value={sellCard.fromBin}
          onChange={(e) =>
            setSellCard({ ...sellCard, fromBin: parseInt(e.target.value) })
          }
        />
      </Form.Group>
      <Form.Group style={{ marginTop: "15px" }}>
        <Button onClick={handleBtnSubmit} style={{ width: "100%" }}>
          Sell Card
        </Button>
      </Form.Group>
    </Form>
  );
};
