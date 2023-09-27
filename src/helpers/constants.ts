enum Environments {
  Dev,
  Testing,
  Production,
}

const futbotEnvironment = Environments.Dev;
const ssoEnvironment = Environments.Dev;
const futbotWebEnvironment = Environments.Dev;

const futbotApi = (environment: Environments) => {
  switch (environment) {
    case Environments.Dev:
      return "https://localhost:7191/api/";
    case Environments.Testing:
      return "https://warehouse-magnus-testing.azurewebsites.net/";
    case Environments.Production:
      return "https://warehouse-magnus.azurewebsites.net/";
  }
};

const futbotSignalR = (environment: Environments) => {
  switch (environment) {
    case Environments.Dev:
      return "https://localhost:7191/hubs";
    case Environments.Testing:
      return "https://warehouse-magnus-testing.azurewebsites.net/";
    case Environments.Production:
      return "https://warehouse-magnus.azurewebsites.net/";
  }
};

const ssoApi = (environment: Environments) => {
  switch (environment) {
    case Environments.Dev:
      return "https://localhost:7206/api";
    case Environments.Testing:
      return "https://magnus-sso.azurewebsites.net/api";
    case Environments.Production:
      return "https://magnus-sso.azurewebsites.net/api";
  }
};

const futbotWebAddress = (environment: Environments) => {
  switch (environment) {
    case Environments.Dev:
      return "http://localhost:3000";
    case Environments.Testing:
      return "";
    case Environments.Production:
      return "";
  }
};

export const API_PATH = futbotApi(futbotEnvironment);
export const SIGNALR_PATH = futbotSignalR(futbotEnvironment);
export const SSO_API_PATH = ssoApi(ssoEnvironment);
export const FUTBOT_WEB_ADDRESS = futbotWebAddress(futbotWebEnvironment);

export const sasToken =
  "?sv=2021-06-08&ss=bfqt&srt=sco&sp=rlax&se=2023-10-12T21:10:12Z&st=2022-10-11T13:10:12Z&spr=https&sig=ur%2BlJ77ellGRP1jZE%2Fo8ruhFpEm5DksvTm2ROQ0Dl6I%3D";
