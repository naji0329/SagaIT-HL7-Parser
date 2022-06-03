import { KeycloakService } from "keycloak-angular";

export function initializeKeycloak(
  keycloak: KeycloakService
  ) {
    return () =>
      keycloak.init({
        config: {
          url: 'https://minikube-dev.local' + '/ident/',
          realm: 'saga-realm',
          clientId: 'hl7-tool',
        },
        initOptions: {
            //onLoad: 'login-required', // don't think this is needed
            checkLoginIframe: false,
        },
      });
}