import { MenuItem, Typography, IconButton, Box } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { Card } from "../../models/models";

export const CardRow = ({
  card,
  onSelectCard,
  isRemoveable,
}: {
  card: Card;
  onSelectCard: (card: Card | undefined) => void;
  isRemoveable?: boolean;
}) => {
  const clubImg = `${card.team.imageUrl}`;
  const flagImg = `${card.nationality.imageUrl}`;
  const playerImg = `${card.shieldUrl}`;

  const isNameTooLong = card.name.length > 20; // Customize this threshold based on design requirements

  return (
    <MenuItem
      key={card.cardId}
      sx={{
        width: "600px", // Wider than container
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "space-between", // Spread out content
        margin: "0 auto", // Center the item horizontally
        position: "relative", // Relative positioning for centering
        left: "50%", // Move the component halfway from the left
        transform: "translateX(-50%)", // Shift it back by half its width
      }}
      onClick={() => {
        if (!isRemoveable) onSelectCard(card);
      }}
    >
      <img
        style={{ height: "60px", width: "50px" }}
        src={playerImg}
        alt={card.name}
      />
      <Box
        sx={{
          flex: 3,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginLeft: "1rem",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontSize: isNameTooLong ? "16px" : "18px",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            width: "100%",
            textAlign: "left",
          }}
        >
          {card.name}
        </Typography>
      </Box>
      <Typography variant="h6" sx={{ flex: 1, textAlign: "center" }}>
        {card.overallRating}
      </Typography>
      <img
        style={{ height: "40px", width: "40px", marginLeft: "15px" }}
        src={flagImg}
        alt={card.nationality.label}
      />
      <img
        style={{
          height: "40px",
          width: "40px",
          marginLeft: "10px",
          marginRight: "10px",
        }}
        src={clubImg}
        alt={card.team.label}
      />
      {isRemoveable && (
        <IconButton
          onClick={() => onSelectCard(undefined)}
          sx={{ marginLeft: "40px" }}
        >
          <CloseIcon color="error" />
        </IconButton>
      )}
    </MenuItem>
  );
};
