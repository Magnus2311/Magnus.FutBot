import React, { LegacyRef, useEffect, useState } from "react";
import { Dropdown, Form, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { PlayerCard } from "../../models/models";
import { selectCards, setupEventsHub } from "./buyActions";
import { CardRow } from "./CardRow";

export const BuyCardIndex = () => {
  const dispatch = useAppDispatch();
  const { cards } = useAppSelector(selectCards);
  const [selectedCard, setSelectedCard] = useState<PlayerCard | undefined>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    setupEventsHub(dispatch).then((connection) => {
      connection.invoke("GetCards");
    });
  }, [dispatch, selectedCard]);

  const selectCard = (card: PlayerCard | undefined) => {
    setSelectedCard(card);
    setIsDropdownOpen(false);
  };

  const CustomToggle = React.forwardRef(
    ({ onClick }: any, ref: LegacyRef<HTMLAnchorElement>) => {
      return selectedCard ? (
        <CardRow
          card={selectedCard}
          onSelectCard={selectCard}
          isRemoveable={true}
        />
      ) : (
        <>
          <Form.Control
            autoFocus
            className="mx-6 my-4 w-1"
            placeholder="Choose the card you wanna buy ..."
            onClick={(e) => {
              e.preventDefault();
              onClick(e);
            }}
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          {!isDropdownOpen &&
            cards
              .sort((a, b) => (a.rating < b.rating ? 1 : -1))
              .slice(0, 20)
              .map((card) => (
                <CardRow card={card} onSelectCard={setSelectedCard} />
              ))}
        </>
      );
    }
  );

  // forwardRef again here!
  // Dropdown needs access to the DOM of the Menu to measure it
  const CustomMenu = React.forwardRef(
    (
      { children, style, className, "aria-labelledby": labeledBy }: any,
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
            {React.Children.toArray(children).filter(
              (child: any) =>
                !value || child.props.card.name.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );

  return (
    <>
      <Dropdown
        onClick={() => setIsDropdownOpen(true)}
        onBlur={() => {
          setTimeout(() => setIsDropdownOpen(false), 500);
        }}
      >
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
            {cards.map((card) => (
              <CardRow card={card} onSelectCard={selectCard} />
            ))}
          </Dropdown.Menu>
        ) : (
          <Spinner animation="border"></Spinner>
        )}
      </Dropdown>
    </>
  );
};
