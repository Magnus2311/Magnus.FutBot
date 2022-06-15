enum Environments {
  Dev,
  Testing,
  Production,
}

const futbotEnvironment = Environments.Dev;
const ssoEnvironment = Environments.Production;
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
