// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const baseAPI = 'http://localhost:3000'
export const environment = {
  production: false,
  GOOGLE_CLIENT_ID:"985463628259-7mekrmle0n10qrunovb22lltj580oamf.apps.googleusercontent.com",
  apiUrl: `${baseAPI}`,
  user_api: `${baseAPI}/students`,
  subject_api: `${baseAPI}/subjects`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
