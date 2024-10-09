import { HubConnection } from "@microsoft/signalr";
import { MouseEvent, ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  TextField,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
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
  }, [dispatch, connection, cardId, incomingSellPlayerDTO?.card.cardId]);

  const handleCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSellCard({ ...sellCard, count: parseInt(e.target.value) });
  };

  const handleBidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSellCard({ ...sellCard, fromBid: parseInt(e.target.value) });
  };

  const handleBinChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSellCard({ ...sellCard, fromBin: parseInt(e.target.value) });
  };

  return (
    <Box
      component="form"
      sx={{
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
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      )}
      <Box sx={{ mt: 2, textAlign: "left" }}>
        <Typography variant="h6">How many cards to sell:</Typography>
        <TextField
          fullWidth
          autoFocus
          value={sellCard.count}
          onChange={handleCountChange}
          type="number"
        />
      </Box>
      <Box sx={{ mt: 2, textAlign: "left" }}>
        <Typography variant="h6">Lowest BID price:</Typography>
        <TextField
          fullWidth
          value={sellCard.fromBid}
          onChange={handleBidChange}
          type="number"
        />
      </Box>
      <Box sx={{ mt: 2, textAlign: "left" }}>
        <Typography variant="h6">Lowest BIN price:</Typography>
        <TextField
          fullWidth
          value={sellCard.fromBin}
          onChange={handleBinChange}
          type="number"
        />
      </Box>
      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleBtnSubmit}
        >
          Sell Card
        </Button>
      </Box>
    </Box>
  );
};
