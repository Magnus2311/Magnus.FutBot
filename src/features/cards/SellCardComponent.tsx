import { HubConnection } from "@microsoft/signalr";
import { MouseEvent, useEffect, useState } from "react";
import { Button, Form, FormControl, FormLabel, Spinner } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router";
import { useAppDispatch } from "../../app/hooks";
import { Card, SellCardDTO } from "../../models/models";
import { getCardsConnection } from "./buyActions";
import { CardRow } from "./CardRow";

interface NavigationState {
  sellCardDTO?: SellCardDTO;
}
export const SellCardComponent = () => {
  const locationState = useLocation().state as NavigationState;
  const incomingSellPlayerDTO = locationState?.sellCardDTO;

  const [connection, setConnection] = useState<HubConnection | undefined>();
  const { cardId, email } = useParams();
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const [cardToSell, setCardToSell] = useState<Card | undefined>();

  const [sellCard, setSellCard] = useState<SellCardDTO>({
    card: cardToSell!,
    email: "",
    count: 0,
    fromBid: 0,
    fromBin: 0,
    ...incomingSellPlayerDTO,
  });

  const handleBtnSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const sellCardDTO = {
      ...sellCard,
      email: email ?? incomingSellPlayerDTO?.email,
      card: cardToSell,
    };
    connection?.invoke("SellCard", sellCardDTO);
  };

  useEffect(() => {
    getCardsConnection(dispatch).then((connection) =>
      setConnection(connection)
    );

    connection
      ?.invoke(
        "GetCardById",
        parseInt(cardId ?? incomingSellPlayerDTO?.card.cardId ?? "")
      )
      .then((card: Card) => setCardToSell(card));
  }, [dispatch, connection, cardId]);

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
