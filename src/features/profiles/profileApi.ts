import { ProfileDTO } from "../../models/models";
import {
  authenticatedGet,
  authenticatedPost,
} from "../../services/communication/connectionServices";

export const addProfile = (profileDTO: ProfileDTO): Promise<ProfileDTO> => {
  return authenticatedPost("profiles/add-profile", profileDTO);
};

export const getProfiles = (): Promise<ProfileDTO[]> => {
  return authenticatedGet("profiles/get-all?");
};
