import { useNavigate } from "react-router-dom";
import { TradeDTO } from "../../models/models";

interface Props {
  trade: TradeDTO;
}

export const BuyTradeComponent = ({ trade }: Props) => {
  const navigation = useNavigate();
  return <></>;
};

export const SellTradeComponent = ({ trade }: Props) => {
  const navigation = useNavigate();
  return <></>;
};

export const BuyAndSellComponent = ({ trade }: Props) => {
  const navigation = useNavigate();
  return <></>;
};
