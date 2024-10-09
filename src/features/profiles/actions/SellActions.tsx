import { SellActionDTO } from "../../../models/models";
import { useAppDispatch } from "../../../app/hooks";
import { TradeActionType } from "../../authentication/models";
import { onActionCancel } from "./tradeActions";
import { CircularProgress, Box, Typography, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  profileId: string;
  sellActions: SellActionDTO[];
}

export const SellActions = ({ profileId, sellActions }: Props) => {
  const dispatch = useAppDispatch();

  const handleActionCancellation = (
    actionId: string,
    actionType: TradeActionType
  ) => {
    dispatch(onActionCancel(profileId, actionId, actionType));
  };

  return sellActions && sellActions.length > 0 ? (
    <Box>
      <Typography variant="h6">Sell actions:</Typography>
      <hr />
      {sellActions.map((sellAction) => {
        return (
          <Box key={sellAction.id} sx={{ mb: 2 }}>
            {sellAction.sellCardDTO && sellAction.sellCardDTO.card ? (
              <Box display="flex" alignItems="center">
                <ShoppingCartIcon color="error" sx={{ mr: 1 }} />
                <Typography variant="body1">
                  Player: {sellAction.sellCardDTO.card?.name}
                  <br />
                  Rating: {sellAction.sellCardDTO.card?.overallRating}
                  <br />
                  Priority: {sellAction.priority}
                </Typography>
                <IconButton
                  color="error"
                  onClick={() =>
                    handleActionCancellation(
                      sellAction.id,
                      TradeActionType.Sell
                    )
                  }
                  sx={{ ml: 2 }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ) : (
              <CircularProgress />
            )}
            <hr />
          </Box>
        );
      })}
    </Box>
  ) : (
    <Box>
      <Typography variant="body1">No pending sell actions</Typography>
      <hr />
    </Box>
  );
};
