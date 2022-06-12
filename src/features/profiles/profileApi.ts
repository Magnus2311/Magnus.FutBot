import {
  ConfirmationCodeResponseDTO,
  ProfileDTO,
  ProfileLoginResponseDTO,
} from "../../models/models";
import {
  authenticatedGet,
  authenticatedPost,
} from "../../services/communication/connectionServices";

export const addProfile = (
  profileDTO: ProfileDTO
): Promise<ProfileLoginResponseDTO> => {
  return authenticatedPost<ProfileLoginResponseDTO>(
    "profiles/add-profile",
    profileDTO
  );
};

export const getProfiles = (): Promise<ProfileDTO[]> => {
  return authenticatedGet("profiles/get-all?");
};

export const sendConfirmationCode = (
  profileDTO: ProfileDTO,
  code: String
): Promise<ConfirmationCodeResponseDTO> => {
  return authenticatedPost("profiles/submit-code", {
    email: profileDTO.email,
    code,
  });
};
