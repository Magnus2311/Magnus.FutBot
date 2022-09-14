import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCards, setupEventsHub } from "./buyActions";
import { CardRow } from "./CardRow";

export const SellCardComponent = () => {
  const { cardId, email } = useParams();
  const cards = useAppSelector(selectCards).cards;
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const cardToSell = cards.find((c) => c.cardId === cardId);

  useEffect(() => {
    setupEventsHub(dispatch).then((connection) => {
      connection.invoke("GetCards");
    });
  }, [dispatch]);

  return (
    <Form>
      <CardRow
        card={cardToSell!}
        onSelectCard={() => {
          navigation(-1);
        }}
        isRemoveable={true}
      />
    </Form>
  );
};
