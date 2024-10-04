import { Button, Grid, Paper, Typography } from "@mui/material";
import TransferCardRow from "./TransferCardRow";
import { ProfileDTO } from "../../models/models";
import { TransferListKeys } from "./CurrentProfile";

interface TransferCardSectionProps {
  sectionTitle: string;
  profile: ProfileDTO;
  transferListMap: Record<string, TransferListKeys>;
  email: string;
}

const TransferCardSection = ({
  sectionTitle,
  profile,
  transferListMap,
  email,
}: TransferCardSectionProps) => {
  const transferCards =
    profile?.tradePile.transferList[
      transferListMap[sectionTitle.toLowerCase().replace(" ", "")]
    ] ?? [];

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "20px",
        marginBottom: "20px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h5" sx={{ marginTop: "20px", textAlign: "start" }}>
        {sectionTitle}:
      </Typography>
      <Grid container spacing={2} sx={{ marginTop: "10px" }}>
        {transferCards.map((transferCard, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <TransferCardRow
              transferCard={transferCard}
              email={email!}
              idx={transferCard.card.cardId}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default TransferCardSection;
