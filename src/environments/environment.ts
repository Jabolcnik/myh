
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth: {
    authServerUrl: 'https://login.allhours.com/connect/token',
    clientId: 'gNa0rGEkFYcBrU8qAevzCzPZe',
    clientSecret: 'ia1QN38I0TMMX1BdZ3yKhSVswtXCzxqP5UTNpgOzlxJBvCui5z',
  },
  notification: {
    toastr: true,
    console: {
      showErrors: true,
      showInfo: true,
      showDebug: true,
      showWarn: true
    }
  },
  apiBaseUrl: 'https://api4.allhours.com',
  apis: {
    users: {
      base: '/api/v1/Users',
      query:'/api/v1/Users/Query'
    }
  }
};
