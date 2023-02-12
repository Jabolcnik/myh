
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apis: {
    users: {
      base: '/api/v1/Users',
      query:'/api/v1/Users/Query'
    },
    absences: {
      base: '/api/v1/Absences'
    }
  }
};
