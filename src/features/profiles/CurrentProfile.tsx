import { HubConnection } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { groupBy } from "../../helpers/additionalFunctions";
import { getCardsConnection } from "../cards/buyActions";
import { CardImage } from "../common/CardImage";
import { onProfilesRequests, selectProfiles } from "./profileActions";
import * as Icon from "react-bootstrap-icons";

export const CurrentProfile = () => {
  const [connection, setConnection] = useState<HubConnection | undefined>();
  const navigation = useNavigate();
  const { profiles } = useAppSelector(selectProfiles);
  const dispatch = useAppDispatch();
  const { email } = useParams();
  const [currentProfile, setCurrentProfile] = useState(
    profiles.find((p) => p.email.toLowerCase() === email?.toLowerCase())
  );

  useEffect(() => {
    getCardsConnection(dispatch).then((connection) =>
      setConnection(connection)
    );
    if (profiles.length === 0) {
      dispatch(onProfilesRequests());
    } else if (currentProfile) {
      // dispatch(onProfileRefreshRequested(currentProfile.id));
    } else {
      setCurrentProfile(
        profiles.find((p) => p.email.toLowerCase() === email?.toLowerCase())
      );
    }
  }, [dispatch, profiles.length, currentProfile, email, profiles]);

  return (
    <Form
      style={{
        width: "clamp(400px, 60%, 100%)",
        textAlign: "center",
      }}
    >
      <Container style={{ textAlign: "left" }}>
        <Row style={{ width: "100%", textAlign: "center" }}>
          <Col>
            <Row>
              <Col>
                <h4>{currentProfile?.email}</h4>
              </Col>
              <Col>
                <Icon.Pen
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigation(`/profiles/edit/${email}`);
                  }}
                />
              </Col>
            </Row>
            <Row>
              <div>Coins: {currentProfile?.coins}</div>
            </Row>
          </Col>
        </Row>
        <Row style={{ width: "100%" }}>
          <Col>
            <div>Active Bids: {currentProfile?.activeBidsCount}</div>
          </Col>
          <Col>
            <div>Outbidded: {currentProfile?.outbidded}</div>
          </Col>
        </Row>
        <Row style={{ width: "100%" }}>
          <Col>
            <div>Status: {currentProfile?.status}</div>
          </Col>
          <Col>
            <div>Transfer List: {currentProfile?.transferListCount}</div>
          </Col>
        </Row>
        <Row style={{ width: "100%" }}>
          <Col>
            <div>Unassigned: {currentProfile?.unassignedCount}</div>
          </Col>
          <Col>
            <div>Won Targets: {currentProfile?.wonTargetsCount}</div>
          </Col>
        </Row>
        <hr></hr>
      </Container>
      <h3>Transfer List:</h3>
      {groupBy(currentProfile?.tradePile.transferList ?? [], "name").map(
        ({ item, count }) => {
          return (
            <div>
              <CardImage
                size="small"
                card={item.possibleCards[0]}
                onClick={() => {
                  navigation(`/sell/${item.possibleCards[0].cardId}/${email}`);
                }}
              />
              <div>Count: {count} / 100</div>
              <hr></hr>
            </div>
          );
        }
      )}
      <div style={{ display: "flex" }}>
        <h3
          style={{
            flex: 2,
            textAlign: "left",
          }}
        >
          Transfer Targets:
        </h3>
        <Button
          onClick={(e) => {
            e.preventDefault();

            connection?.invoke("SendTransferTargetsToTransferList", email);
          }}
        >
          Send to Transfer List
        </Button>
      </div>
      {groupBy(currentProfile?.tradePile.transferTargets ?? [], "name").map(
        ({ item, count }) => {
          return (
            <div>
              <div>{item.possibleCards[0].name}</div>
              <div>{item.playerCardStatus}</div>
              <div>{item.possibleCards[0].playerType}</div>
              <div>{item.possibleCards[0].rating}</div>
              <div>Count: {count} / 50</div>
              <hr></hr>
            </div>
          );
        }
      )}
      <div style={{ display: "flex" }}>
        <h3
          style={{
            flex: 2,
            textAlign: "left",
          }}
        >
          Unassigned items:
        </h3>
        <Button
          onClick={(e) => {
            e.preventDefault();

            connection?.invoke("SendUnassignedItemsToTransferList", email);
          }}
        >
          Send to Transfer List
        </Button>
      </div>
      {groupBy(currentProfile?.tradePile.unassignedItems ?? [], "name").map(
        ({ item, count }) => {
          return (
            <div>
              <div>{item.possibleCards[0].name}</div>
              <div>{item.playerCardStatus}</div>
              <div>{item.possibleCards[0].playerType}</div>
              <div>{item.possibleCards[0].rating}</div>
              <div>Count: {count}</div>
              <hr></hr>
            </div>
          );
        }
      )}
    </Form>
  );
};
