import { HubConnection } from "@microsoft/signalr";
import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  TextField,
  CircularProgress,
  Popper,
  Paper,
  MenuItem,
  Box,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Card } from "../../models/models";
import { getCardsConnection, selectCards } from "./buyActions";
import { CardRow } from "./CardRow";

interface Props {
  selectCard: (card: Card | undefined) => void;
}

export const SelectCardIndex = ({ selectCard }: Props) => {
  const dispatch = useAppDispatch();
  const { cards } = useAppSelector(selectCards);
  const [value, setValue] = useState("");
  const [connection, setConnection] = useState<HubConnection | undefined>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const popperRef = useRef<HTMLDivElement>(null); // Ref for the Popper
  const [open, setOpen] = useState(false);

  const searchCards = useCallback(
    (name: string) => {
      connection?.invoke("GetCards", name);
    },
    [connection]
  );

  useEffect(() => {
    getCardsConnection(dispatch).then((connection) => {
      setConnection(connection);
      searchCards(value);
    });
  }, [dispatch, value, searchCards]);

  const handleCardSearch = (name: string) => {
    setValue(name);
    searchCards(name);
  };

  const handlePopperOpen = (event: React.MouseEvent<HTMLInputElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handlePopperClose = () => {
    setOpen(false);
  };

  // Close the Popper when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popperRef.current &&
        !popperRef.current.contains(event.target as Node) &&
        anchorEl &&
        !anchorEl.contains(event.target as Node)
      ) {
        handlePopperClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, anchorEl]);

  return (
    <Box>
      <TextField
        fullWidth
        autoFocus
        inputRef={inputRef}
        placeholder="Choose the card you want to buy ..."
        onChange={(e) => handleCardSearch(e.target.value)}
        onClick={handlePopperOpen}
        value={value}
      />
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        style={{ zIndex: 2, width: "600px" }}
        disablePortal
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [-75, 5],
            },
          },
        ]}
        ref={popperRef}
      >
        <Paper
          elevation={3}
          sx={{
            width: "600px",
            backgroundColor: "white",
          }}
        >
          {cards.length > 0 ? (
            cards.slice(0, 20).map((card) => (
              <MenuItem key={card.cardId} onClick={handlePopperClose}>
                <CardRow card={card} onSelectCard={selectCard} />
              </MenuItem>
            ))
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
              <CircularProgress color="primary" />
            </Box>
          )}
        </Paper>
      </Popper>
    </Box>
  );
};
