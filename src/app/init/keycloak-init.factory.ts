import { KeycloakService } from "keycloak-angular";
import { environment } from '../../environments/environment';

export function initializeKeycloak(
  keycloak: KeycloakService
  ) {
    return () =>
      keycloak.init({
        config: {
          url: environment.keycloakUrl,
          realm: environment.keycloakRealm,
          clientId: environment.keycloakClientId,
        },
        initOptions: {
            //onLoad: 'login-required', // don't think this is needed
            checkLoginIframe: false,
        },
      });
}