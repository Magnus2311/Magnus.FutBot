import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { onTradesRequested, selectTrades } from "./tradeHistoryActions";
import { useEffect, useState } from "react";
import { selectProfiles } from "../profiles/profileActions";
import { TradeHistoryActionType } from "../../models/models";
import {
  BuyAndSellComponent,
  BuyTradeComponent,
  SellTradeComponent,
} from "./TradeComponent";

const TradesIndex = () => {
  const { profiles } = useAppSelector(selectProfiles);
  const { trades } = useAppSelector(selectTrades);
  const dispatch = useAppDispatch();
  const { email } = useParams();
  const [profile] = useState(
    profiles.find((p) => p.email.toLowerCase() === email?.toLowerCase())
  );

  useEffect(() => {
    profile && dispatch(onTradesRequested(profile.id));
  }, [dispatch, profile]);

  return (
    <div>
      <h2>Trades history:</h2>
      {trades.map((trade) => {
        if (trade.tradeHistoryActionType === TradeHistoryActionType.Buy)
          return <BuyTradeComponent key={trade.id} trade={trade} />;
        else if (trade.tradeHistoryActionType === TradeHistoryActionType.Sell)
          return <SellTradeComponent key={trade.id} trade={trade} />;
        else return <BuyAndSellComponent key={trade.id} trade={trade} />;
      })}
    </div>
  );
};

export default TradesIndex;
