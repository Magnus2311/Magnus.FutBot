import React, { LegacyRef, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import currentImage from "../../assets/revision-images/Futties.png";

export const BuyCardIndex = () => {
    const [value, setValue] = useState('');

    const CustomToggle = React.forwardRef(({ onClick }: any, ref: LegacyRef<HTMLAnchorElement>) => {

        return <Form.Control
                autoFocus
                className="mx-3 my-2 w-auto"
                placeholder="Choose the card you wanna buy ..."
                onClick={e => {
                    e.preventDefault();
                    onClick(e);
                }}
                onChange={(e) => setValue(e.target.value)}
                value={value}
              />
    });
      
      // forwardRef again here!
      // Dropdown needs access to the DOM of the Menu to measure it
      const CustomMenu = React.forwardRef(
        ({ children, style, className, 'aria-labelledby': labeledBy }: any, ref: LegacyRef<HTMLDivElement>) => {
      
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
                    !value || child.props.children.toLowerCase().startsWith(value),
                )}
              </ul>
            </div>
          );
        },
      );

    return <Dropdown> 
    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" />

    <Dropdown.Menu as={CustomMenu}>
      <Dropdown.Item eventKey="1">Red</Dropdown.Item>
      <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
      <Dropdown.Item eventKey="3" active>
        Orange
      </Dropdown.Item>
      <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
}