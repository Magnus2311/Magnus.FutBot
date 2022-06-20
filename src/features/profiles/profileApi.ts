import {
  ConfirmationCodeResponseDTO,
  AddProfileDTO,
  ProfileLoginResponseDTO,
} from "../../models/models";
import {
  authenticatedGet,
  authenticatedPost,
} from "../../services/communication/connectionServices";

export const addProfile = (
  profileDTO: AddProfileDTO
): Promise<ProfileLoginResponseDTO> => {
  return authenticatedPost<ProfileLoginResponseDTO>(
    "profiles/add-profile",
    profileDTO
  );
};

export const getProfiles = (): Promise<AddProfileDTO[]> => {
  return authenticatedGet("profiles/get-all?");
};

export const sendConfirmationCode = (
  profileDTO: AddProfileDTO,
  code: String
): Promise<ConfirmationCodeResponseDTO> => {
  return authenticatedPost("profiles/submit-code", {
    email: profileDTO.email,
    code,
  });
};
