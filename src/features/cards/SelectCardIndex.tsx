import { HubConnection } from "@microsoft/signalr";
import React, { LegacyRef, useCallback, useEffect, useState } from "react";
import { Dropdown, Form, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Card } from "../../models/models";
import { getCardsConnection, selectCards, setupEventsHub } from "./buyActions";
import { BuyCardComponent } from "./BuyCardComponent";
import { CardRow } from "./CardRow";

export const SelectCardIndex = () => {
  const dispatch = useAppDispatch();
  const { cards } = useAppSelector(selectCards);
  const [selectedCard, setSelectedCard] = useState<Card | undefined>();
  const [value, setValue] = useState("");
  const [connection, setConnection] = useState<HubConnection | undefined>();

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
  }, [dispatch, selectedCard, value, searchCards]);

  const handleCardSearch = (name: string) => {
    setValue(name);
    searchCards(name);
  };

  const selectCard = (card: Card | undefined) => {
    setSelectedCard(card);
  };

  const CustomToggle = React.forwardRef(
    ({ onClick }: any, ref: LegacyRef<HTMLAnchorElement>) => {
      return (
        <>
          <Form.Control
            autoFocus
            className="mx-6 my-4 w-1"
            placeholder="Choose the card you wanna buy ..."
            onClick={(e) => {
              e.preventDefault();
              onClick(e);
            }}
            onChange={(e) => handleCardSearch(e.target.value)}
            value={value}
          />
        </>
      );
    }
  );

  const CustomMenu = React.forwardRef(
    (
      { style, className, "aria-labelledby": labeledBy }: any,
      ref: LegacyRef<HTMLDivElement>
    ) => {
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <ul className="list-unstyled">
            {cards.map((card) => (
              <CardRow
                key={card.cardId}
                card={card}
                onSelectCard={selectCard}
              />
            ))}
          </ul>
        </div>
      );
    }
  );

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" />

        {cards.length > 0 ? (
          <Dropdown.Menu
            as={CustomMenu}
            style={{
              marginLeft: "-190px",
              width: "600px",
              position: "absolute",
            }}
          >
            {cards.slice(0, 20).map((card) => (
              <CardRow
                key={card.cardId}
                card={card}
                onSelectCard={selectCard}
              />
            ))}
          </Dropdown.Menu>
        ) : (
          <Spinner animation="border" color="blue"></Spinner>
        )}
      </Dropdown>
      <BuyCardComponent
        card={selectedCard}
        onDeselect={() => selectCard(undefined)}
      />
    </>
  );
};
