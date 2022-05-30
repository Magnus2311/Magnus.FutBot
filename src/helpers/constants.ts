enum Environments {
  Dev,
  Testing,
  Production,
}

const futbotEnvironment = Environments.Production;
const ssoEnvironment = Environments.Production;

const futbotApi = (environment: Environments) => {
  switch (environment) {
    case Environments.Dev:
      return "https://localhost:5001/";
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

export const API_PATH = futbotApi(futbotEnvironment);
export const SSO_API_PATH = ssoApi(ssoEnvironment);
