/**
 * This object contains all of routes of pages present in the web app.
 */
const routes = {
  index: "/",
  docsList: "/docs",
  docDetails: (docID: string) => `/docs/details/${docID}`,
  eventList: "/events",
  search: "/search",
  getReports: "/reports",
  otherFeatures: "/others",
  logout: "/logout",
  test: (index: string) => `/blog/${index}`
}

export default routes;