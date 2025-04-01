const backendDomin = "http://localhost:8080";

const SummaryApi = {
  signUp: {
    url: `${backendDomin}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomin}/api/signin`,
    method: "post",
  },
  UserDetails: {
    url: `${backendDomin}/api/user-details`,
    method: "get",
  },
  UserLogout: {
    url: `${backendDomin}/api/user-logout`,
    method: "get",
  },
  AllUsers:{
    url: `${backendDomin}/api/all-user-details`,
    method: "get",
  },
  updateUser:{
    url: `${backendDomin}/api/update-user-role`,
    method: "post",
  },
  collectorForm:{
    url: `${backendDomin}/api/collector-form`,
    method: "post",
  },
  allCollector:{
    url: `${backendDomin}/api/get-collector`,
    method: "get"
  },
  updateCollector:{
    url: `${backendDomin}/api/update-collector`,
    method: "post"
  },
};

export default SummaryApi;
