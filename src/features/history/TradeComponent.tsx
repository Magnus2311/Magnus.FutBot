import { useNavigate } from "react-router-dom";
import { TradeDTO } from "../../models/models";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";

interface Props {
  trade: TradeDTO;
}

export const BuyTradeComponent = ({ trade }: Props) => {
  const navigation = useNavigate();
  return (
    <Card
      sx={{ width: "100%", marginBottom: 2, cursor: "pointer" }}
      onClick={() => {
        navigation("/cards/buy", {
          state: { buyCardDTO: trade.buyCardDTO },
        });
      }}
    >
      <CardContent>
        <Typography variant="h6" component="div" align="center">
          Buy action
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <CardMedia
              component="img"
              image={trade.buyCardDTO.card?.shieldUrl}
              alt={trade.buyCardDTO.card?.name}
              sx={{ width: "80px", height: "120px" }}
            />
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h5" component="div">
              {trade.buyCardDTO.card?.name}
            </Typography>
            <Grid container>
              <Grid item xs={6}>
                <Typography>Buy Price:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{trade.buyCardDTO.price}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export const SellTradeComponent = ({ trade }: Props) => {
  const navigation = useNavigate();
  return (
    <Card
      sx={{ width: "100%", marginBottom: 2, cursor: "pointer" }}
      onClick={() => {
        navigation(
          `/sell/${trade.sellCardDTO.card.eaId}/${trade.sellCardDTO.email}`,
          {
            state: { sellCardDTO: trade.sellCardDTO },
          }
        );
      }}
    >
      <CardContent>
        <Typography variant="h6" component="div" align="center">
          Sell action
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <CardMedia
              component="img"
              image={trade.sellCardDTO.card?.shieldUrl}
              alt={trade.sellCardDTO.card?.name}
              sx={{ width: "80px", height: "120px" }}
            />
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h5" component="div">
              {trade.sellCardDTO.card?.name}
            </Typography>
            <Grid container>
              <Grid item xs={6}>
                <Typography>Sell from:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{trade.sellCardDTO.fromBid}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Sell to:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{trade.sellCardDTO.fromBin}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export const BuyAndSellComponent = ({ trade }: Props) => {
  const navigation = useNavigate();
  return (
    <Card
      sx={{ width: "100%", marginBottom: 2, cursor: "pointer" }}
      onClick={() => {
        navigation("/cards/buy-and-sell", {
          state: { buySellPlayerInc: trade.buyAndSellCardDTO },
        });
      }}
    >
      <CardContent>
        <Typography variant="h6" component="div" align="center">
          Buy and sell action
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <CardMedia
              component="img"
              image={trade.buyAndSellCardDTO.card?.shieldUrl}
              alt={trade.buyAndSellCardDTO.card?.name}
              sx={{ width: "80px", height: "120px" }}
            />
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h5" component="div">
              {trade.buyAndSellCardDTO.card?.name}
            </Typography>
            <Grid container>
              <Grid item xs={6}>
                <Typography>Buy Price:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{trade.buyAndSellCardDTO.price}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Sell from:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{trade.buyAndSellCardDTO.fromBid}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Sell to:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{trade.buyAndSellCardDTO.fromBin}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
