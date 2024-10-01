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
import { Grid } from "@mui/material";

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
    <div style={{ width: "80%", margin: "0 auto" }}>
      <h2>Trades history:</h2>
      <Grid container spacing={2}>
        {trades.map((trade) => (
          <Grid item xs={12} sm={6} md={4} key={trade.id}>
            {trade.tradeHistoryActionType === TradeHistoryActionType.Buy ? (
              <BuyTradeComponent trade={trade} />
            ) : trade.tradeHistoryActionType === TradeHistoryActionType.Sell ? (
              <SellTradeComponent trade={trade} />
            ) : (
              <BuyAndSellComponent trade={trade} />
            )}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TradesIndex;
