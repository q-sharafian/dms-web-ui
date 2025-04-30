export interface UserPreferences {
  authToken: string | null
  /**
   * Real first/last name/nickname of user
   */
  realUserName: string | null
  /**
   * Number of tasks we expect to complete for the application to be usable.
   */
  loading: number | null
}

/**
 * LocalStorage field keys
 */
export enum LSFieldKey {
  AuthToken = "authToken",
  RealUserName = "realUserName",
  Loading = "loading"
}