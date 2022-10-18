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
  activeBidsCount: number;
  wonTargetsCount: number;
  transferListCount: number;
  unassignedCount: number;
  outbidded: number;
  tradePile: TradePile;
  autoRelist: boolean;
}

export interface TradePile {
  transferList: TransferCard[];
  unassignedItems: TransferCard[];
  transferTargets: TransferCard[];
  clubItems: TransferCard[];
}

export interface TransferCard {
  possibleCards: Card[];
  playerCardStatus: PlayerCardStatus;
  bougthFor: number;
}

export interface Card {
  cardId: string;
  name: string;
  rating: number;
  fullName: string;
  club: string;
  clubLogo: string;
  leagueLogo: string;
  nationLogo: string;
  backgroundImage: string;
  nation: string;
  league: string;
  playerImage: string;
  revision: string;
  assetId: number;
  clubId: number;
  leagueId: number;
  stats: PlayerStats;
  playerCardStatus: PlayerCardStatus;
  playerType: PlayerCardType;
  nationId: number;
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
}

export interface SellCardDTO {
  card: Card;
  count: number;
  fromBid: number;
  toBid?: number;
  fromBin: number;
  toBin?: number;
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
}
