import { useNavigate } from "react-router-dom";
import { TradeDTO } from "../../models/models";
import { Col, Row } from "react-bootstrap";

interface Props {
  trade: TradeDTO;
}

export const BuyTradeComponent = ({ trade }: Props) => {
  const navigation = useNavigate();
  return (
    <fieldset
      style={{ width: "100%" }}
      onClick={() => {
        navigation("/cards/buy", {
          state: { buyCardDTO: trade.buyCardDTO },
        });
      }}
    >
      <legend style={{ margin: "0 auto", textAlign: "center" }}>
        Buy action
      </legend>
      <h5>{trade.buyCardDTO.card?.name}</h5>
      <div>
        <Row>
          <Col>Buy Price:</Col>
          <Col>{trade.buyCardDTO.price}</Col>
        </Row>
      </div>
    </fieldset>
  );
};

export const SellTradeComponent = ({ trade }: Props) => {
  const navigation = useNavigate();
  return (
    <fieldset
      style={{ width: "100%" }}
      onClick={() => {
        navigation(
          `/sell/${trade.sellCardDTO.card.eaId}/${trade.sellCardDTO.email}`,
          {
            state: { sellCardDTO: trade.sellCardDTO },
          }
        );
      }}
    >
      <legend style={{ margin: "0 auto", textAlign: "center" }}>
        Sell action
      </legend>
      <h5>{trade.sellCardDTO.card?.name}</h5>
      <div>
        <Row>
          <Col>Sell from price:</Col>
          <Col>{trade.sellCardDTO.fromBid}</Col>
          <Col>Sell to price:</Col>
          <Col>{trade.sellCardDTO.fromBin}</Col>
        </Row>
      </div>
    </fieldset>
  );
};

export const BuyAndSellComponent = ({ trade }: Props) => {
  const navigation = useNavigate();
  return (
    <fieldset
      style={{ width: "100%" }}
      onClick={() => {
        navigation("/cards/buy-and-sell", {
          state: { buySellPlayerInc: trade.buyAndSellCardDTO },
        });
      }}
    >
      <legend style={{ margin: "0 auto", textAlign: "center" }}>
        Buy and sell action
      </legend>
      <h5>{trade.buyAndSellCardDTO.card?.name}</h5>
      <div>
        <Row>
          <Col>Buy Price:</Col>
          <Col>{trade.buyAndSellCardDTO.price}</Col>
          <Col>Sell from price:</Col>
          <Col>{trade.buyAndSellCardDTO.fromBid}</Col>
          <Col>Sell to price:</Col>
          <Col>{trade.buyAndSellCardDTO.fromBin}</Col>
        </Row>
      </div>
    </fieldset>
  );
};
