import React, { LegacyRef, useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { PlayerCard } from "../../models/models";
import { selectCards, setupEventsHub } from "./buyActions";
import { CardRow } from "./CardRow";

export const BuyCardIndex = () => {
  const dispatch = useAppDispatch();
  const { cards } = useAppSelector(selectCards);
  const [selectedCard, setSelectedCard] = useState<PlayerCard | undefined>();
  const [value, setValue] = useState("");

  useEffect(() => {
    setupEventsHub(dispatch).then((connection) => {
      connection.invoke("GetCards");
    });
  }, [dispatch]);

  const CustomToggle = React.forwardRef(
    ({ onClick }: any, ref: LegacyRef<HTMLAnchorElement>) => {
      return selectedCard ? (
        <CardRow
          card={selectedCard}
          onSelectCard={setSelectedCard}
          isRemoveable={true}
        />
      ) : (
        <Form.Control
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Choose the card you wanna buy ..."
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
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
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" />

        <Dropdown.Menu
          as={CustomMenu}
          style={{ marginLeft: "-190px", width: "600px" }}
        >
          {cards.map((card) => {
            return <CardRow card={card} onSelectCard={setSelectedCard} />;
          })}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
