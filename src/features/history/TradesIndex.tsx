import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { onTradesRequested, selectTrades } from "./tradeHistoryActions";
import { useEffect, useState } from "react";
import { onProfilesRequests, selectProfiles } from "../profiles/profileActions";
import { ProfileDTO, TradeHistoryActionType } from "../../models/models";
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
  const [profile, setProfile] = useState<ProfileDTO>();

  useEffect(() => {
    const tempProfile = profiles.find(
      (p) => p.email.toLowerCase() === email?.toLowerCase()
    );

    if (tempProfile) {
      setProfile(tempProfile);
      profile && dispatch(onTradesRequested(profile.id));
    }
  }, [dispatch, profile, profiles]);

  useEffect(() => {
    (!profiles || profiles.length === 0) && dispatch(onProfilesRequests());
  }, [profiles]);

  return (
    <div style={{ width: "80%" }}>
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
