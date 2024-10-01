import { Box, Typography, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TransferCard } from "../../models/models";

interface TransfercardRowProps {
  transferCard: TransferCard;
  email: string;
  idx: string;
}

const TransferCardRow = ({
  transferCard,
  email,
  idx,
}: TransfercardRowProps) => {
  const navigate = useNavigate();

  return (
    <Box
      key={idx}
      onClick={() => navigate(`/sell/${transferCard.card.eaId}/${email}`)}
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        padding: "10px",
      }}
    >
      <Box
        component="img"
        src={transferCard.card.shieldUrl}
        alt={transferCard.card.name}
        sx={{ width: 60, height: 80, marginRight: 2 }}
      />
      <Box>
        <Typography>{transferCard.card.name}</Typography>
        <Typography>Count: {transferCard.count}</Typography>
      </Box>
    </Box>
  );
};

export default TransferCardRow;
