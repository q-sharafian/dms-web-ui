/**
 * This object contains all of routes of the pages present in the web app.
 */
const routes = {
  index: "/",
  docsList: "/docs",
  docDetails: (docID: string) => `/docs/details/${docID}`,
  eventDetails: (jpID: string, eventID: string) => `/events/details/${eventID}/jp/${jpID}`,
  eventList: "/events",
  search: "/search",
  getReports: "/reports",
  otherFeatures: "/others",
  logout: "/logout",
  test: (index: string) => `/blog/${index}`
}

export default routes;