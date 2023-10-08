import { HubConnection } from "@microsoft/signalr";
import { MouseEvent, useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Col,
  Container,
  Form,
  FormLabel,
  Row,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getCardsConnection } from "../cards/buyActions";
import {
  getProfileConnection,
  onProfilesRequests,
  selectProfiles,
} from "./profileActions";
import * as Icon from "react-bootstrap-icons";
import { Switch } from "../common/Switch";
import { ActionsList } from "./actions/ActionsList";

export const CurrentProfile = () => {
  const [cardsConnection, setCardsConnection] = useState<
    HubConnection | undefined
  >();
  const [profilesConnection, setProfilesConnection] = useState<
    HubConnection | undefined
  >();
  const navigation = useNavigate();
  const { profiles } = useAppSelector(selectProfiles);
  const dispatch = useAppDispatch();
  const { email } = useParams();
  const [currentProfile, setCurrentProfile] = useState(
    profiles.find((p) => p.email.toLowerCase() === email?.toLowerCase())
  );
  const [autoRelist, setAutoRelist] = useState(
    currentProfile?.autoRelist ?? false
  );

  useEffect(() => {
    getCardsConnection(dispatch).then((connection) =>
      setCardsConnection(connection)
    );
    getProfileConnection(dispatch).then((connection) =>
      setProfilesConnection(connection)
    );
    if (profiles.length === 0) {
      dispatch(onProfilesRequests());
    } else if (currentProfile) {
      // dispatch(onProfileRefreshRequested(currentProfile.id));
    } else {
      const profile = profiles.find(
        (p) => p.email.toLowerCase() === email?.toLowerCase()
      );
      setCurrentProfile(profile);
      setAutoRelist(profile!.autoRelist);
    }
  }, [dispatch, profiles.length, currentProfile, email, profiles]);

  const handleRelistAll = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const profileDTO = currentProfile;
    cardsConnection?.invoke("RelistAllForProfile", profileDTO);
  };

  return (
    <Form
      style={{
        width: "clamp(400px, 60%, 100%)",
        textAlign: "center",
      }}
    >
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Additional Options</Accordion.Header>
          <Accordion.Body>
            <Form.Group style={{ marginTop: "10px", textAlign: "left" }}>
              <FormLabel>Relist items every hour: </FormLabel>
              <Switch
                label=""
                isChecked={autoRelist}
                setIsChecked={() => {
                  const newValue = !autoRelist;
                  setAutoRelist(newValue);
                  const profileData = {
                    profileId: currentProfile?.id,
                    autoRelist: newValue,
                  };
                  profilesConnection?.invoke("SetAutoRelist", profileData);
                }}
              />
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>
        {currentProfile && (
          <Accordion.Item eventKey="1">
            <Accordion.Header>Current Actions</Accordion.Header>
            <Accordion.Body>
              <ActionsList profileId={currentProfile.id} />
            </Accordion.Body>
          </Accordion.Item>
        )}
      </Accordion>
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
        <Row style={{ width: "100%" }}></Row>
        <Row style={{ width: "100%" }}>
          <Col>
            <div>Status: {currentProfile?.status}</div>
          </Col>
          <Col>
            <div>
              Transfer List:{" "}
              {currentProfile?.tradePile.transferList.activeTransfers.length}
            </div>
          </Col>
        </Row>
        <Row style={{ width: "100%" }}>
          <Col>
            <div>
              Unassigned: {currentProfile?.tradePile.unassignedItems.length}
            </div>
          </Col>
        </Row>
        <hr></hr>
      </Container>
      <Button onClick={handleRelistAll}>Relist all</Button>
      <h3>Unassigned Items:</h3>
      {(currentProfile?.tradePile.unassignedItems ?? []).map((transferCard) => {
        return (
          <div>
            {/* <CardImage
                size="small"
                card={item.possibleCards[0]}
                onClick={() => {
                  navigation(`/sell/${item.possibleCards[0].cardId}/${email}`);
                }}
              /> */}
            <div
              onClick={() => {
                navigation(`/sell/${transferCard.card.eaId}/${email}`);
              }}
            >
              {transferCard.card.name}
            </div>
            <div>Count: {transferCard.count}</div>
            <hr></hr>
          </div>
        );
      })}
      <h3>Sold Items:</h3>
      {(currentProfile?.tradePile.transferList.soldItems ?? []).map(
        (transferCard) => {
          return (
            <div>
              {/* <CardImage
                size="small"
                card={item.possibleCards[0]}
                onClick={() => {
                  navigation(`/sell/${item.possibleCards[0].cardId}/${email}`);
                }}
              /> */}
              <div
                onClick={() => {
                  navigation(`/sell/${transferCard.card.eaId}/${email}`);
                }}
              >
                {transferCard.card.name}
              </div>
              <div>Count: {transferCard.count} / 100</div>
              <hr></hr>
            </div>
          );
        }
      )}
      <h3>Unsold Items:</h3>
      {(currentProfile?.tradePile.transferList.unsoldItems ?? []).map(
        (transferCard) => {
          return (
            <div>
              {/* <CardImage
                size="small"
                card={item.possibleCards[0]}
                onClick={() => {
                  navigation(`/sell/${item.possibleCards[0].cardId}/${email}`);
                }}
              /> */}
              <div
                onClick={() => {
                  navigation(`/sell/${transferCard.card.eaId}/${email}`);
                }}
              >
                {transferCard.card.name}
              </div>
              <div>Count: {transferCard.count} / 100</div>
              <hr></hr>
            </div>
          );
        }
      )}
      <h3>Available Items:</h3>
      {(currentProfile?.tradePile.transferList.availableItems ?? []).map(
        (transferCard) => {
          return (
            <div>
              {/* <CardImage
                size="small"
                card={item.possibleCards[0]}
                onClick={() => {
                  navigation(`/sell/${item.possibleCards[0].cardId}/${email}`);
                }}
              /> */}
              <div
                onClick={() => {
                  navigation(`/sell/${transferCard.card.eaId}/${email}`);
                }}
              >
                {transferCard.card.name}
              </div>
              <div>Count: {transferCard.count} / 100</div>
              <hr></hr>
            </div>
          );
        }
      )}
      <h3>Active Items:</h3>
      {(currentProfile?.tradePile.transferList.activeTransfers ?? []).map(
        (transferCard) => {
          return (
            <div>
              {/* <CardImage
                size="small"
                card={item.possibleCards[0]}
                onClick={() => {
                  navigation(`/sell/${item.possibleCards[0].cardId}/${email}`);
                }}
              /> */}
              <div
                onClick={() => {
                  navigation(`/sell/${transferCard.card.eaId}/${email}`);
                }}
              >
                {transferCard.card.name}
              </div>
              <div>Count: {transferCard.count} / 100</div>
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

            cardsConnection?.invoke("SendTransferTargetsToTransferList", email);
          }}
        >
          Send to Transfer List
        </Button>
      </div>
      {/* {groupBy(currentProfile?.tradePile.transferTargets ?? [], "name").map(
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
      )} */}
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

            cardsConnection?.invoke("SendUnassignedItemsToTransferList", email);
          }}
        >
          Send to Transfer List
        </Button>
      </div>
      {/* {groupBy(currentProfile?.tradePile.unassignedItems ?? [], "name").map(
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
      )} */}
    </Form>
  );
};
