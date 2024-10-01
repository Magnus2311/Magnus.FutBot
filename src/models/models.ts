export interface AddProfileDTO {
  email: string;
  password: string;
}

export interface ProfileDTO {
  id: string;
  email: string;
  password: string;
  coins: number;
  status: LoginStatusType;
  tradePile: TradePile;
  autoRelist: boolean;
}

export interface TradePile {
  transferList: TransferList;
  unassignedItems: TransferCard[];
  transferTargets: TransferCard[];
  clubItems: TransferCard[];
}

export interface TransferList {
  unassignedItems: Array<TransferCard>;
  soldItems: Array<TransferCard>;
  unsoldItems: Array<TransferCard>;
  availableItems: Array<TransferCard>;
  activeTransfers: Array<TransferCard>;
}

export interface TransferCard {
  card: Card;
  count: number;
}

export interface Card {
  eaId: number;
  cardId: string;
  name: string;
  overallRating: number;
  fullName: string;
  backgroundImage: string;
  league: string;
  revision: string;
  assetId: number;
  clubId: number;
  leagueId: number;
  stats: PlayerStats;
  playerCardStatus: PlayerCardStatus;
  playerType: PlayerCardType;
  nationId: number;
  shieldUrl: string;
  team: Team;
  nationality: Nationality;
}

export interface Nationality {
  id: number;
  label: string;
  imageUrl: string;
}

export interface Team {
  id: number;
  label: string;
  imageUrl: string;
  isPopular: boolean;
}

export interface PlayerStats {
  pace: Pace;
  shooting: Shooting;
  passing: Passing;
  dribbling: DribblingData;
  defending: Defending;
  physicality: Physicality;
}

export interface Pace {
  overall: number;
  acceleration: number;
  sprintSpeed: number;
}

export interface Shooting {
  overall: number;
  positioning: number;
  finishing: number;
  shotPower: number;
  longShots: number;
  volleys: number;
  penalties: number;
}

export interface Passing {
  overall: number;
  vision: number;
  crossing: number;
  fKAccuracy: number;
  shortPassing: number;
  longPassing: number;
  curve: number;
}

export interface DribblingData {
  overall: number;
  agility: number;
  balance: number;
  reactions: number;
  ballControl: number;
  dribbling: number;
  composure: number;
}

export interface Defending {
  overall: number;
  interceptions: number;
  headingAccuracy: number;
  defensiveAwareness: number;
  standingTackle: number;
  slidingTackle: number;
}

export interface Physicality {
  overall: number;
  jumping: number;
  stamina: number;
  aggresion: number;
  strength: number;
}

export enum LoginStatusType {
  Successful,
  WrongCredentials,
  ConfirmationKeyRequired,
  CaptchaNeeded,
  AlreadyAdded,
  UnknownError,
}

export enum ConfirmationCodeStatusType {
  Successful,
  WrongCode,
}

export enum PlayerCardStatus {
  Pending,
  Won,
  Outbidded,
}

export enum PlayerCardType {
  Bronze,
  Silver,
  Gold,
  TOTW,
  // New types should be added
}

export interface ProfileLoginResponseDTO {
  loginStatus: LoginStatusType;
  profile: ProfileDTO;
}

export interface ConfirmationCodeResponseDTO {
  status: ConfirmationCodeStatusType;
  email: ProfileDTO;
}

export interface Player {
  id: number;
  rating: number;
  name: string;
}

export interface GroupedType<T> {
  item: T;
  count: number;
}

export interface BuyCardDTO {
  card?: Card;
  quality: string;
  rarity: string;
  position: string;
  chemistry: string;
  nationallity: string;
  isBin: boolean;
  count: number;
  price: number;
  email: string;
}

export interface SellCardDTO {
  card: Card;
  count: number;
  fromBid: number;
  toBid?: number;
  fromBin: number;
  toBin?: number;
  email: string;
}

export interface BuyActionDTO {
  id: string;
  priority: number;
  buyCardDTO: BuyCardDTO;
  type: string;
  description: string;
}

export interface SellActionDTO {
  id: string;
  priority: number;
  sellCardDTO: SellCardDTO;
  type: string;
  description: string;
}

export interface MoveActionDTO {
  id: string;
  priority: number;
  type: string;
  description: string;
}

export interface TradeAction {
  id: string;
  type: string;
  description: string;
}

export interface TradeActions {
  buyActions: BuyActionDTO[];
  sellActions: SellActionDTO[];
  moveActions: MoveActionDTO[];
}

export interface BuyAndSellCardDTO {
  card?: Card;
  quality: string;
  rarity: string;
  position: string;
  chemistry: string;
  nationallity: string;
  isBin: boolean;
  count: number;
  price: number;
  fromBid: number;
  toBid?: number;
  fromBin: number;
  toBin?: number;
  email: string;
}

export enum TradeHistoryActionType {
  Buy,
  Sell,
  BuyAndSell,
}

export interface TradeDTO {
  id: string;
  userId: string;
  profileId: string;
  isDeleted: boolean;
  createdDate: Date;
  buyCardDTO: BuyCardDTO;
  sellCardDTO: SellCardDTO;
  buyAndSellCardDTO: BuyAndSellCardDTO;
  tradeHistoryActionType: TradeHistoryActionType;
}
