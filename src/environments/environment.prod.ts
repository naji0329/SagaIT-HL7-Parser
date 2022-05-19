export const environment = {
  production: true,
  enableCrsfTokenRequest : false,
  hl7JavaConvertUrl: '/hl7-tool/api/java/hl72fhir',
  hl7CsharpConvertUrl: '/hl7-tool/api/csharp/convert',
  keycloakUrl: 'https://minikube-dev.local' + '/ident/',
  keycloakRealm: 'saga-realm',
  keycloakClientId: 'hl7-tool',
};
