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
  AllUsers: {
    url: `${backendDomin}/api/all-user-details`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomin}/api/update-user-role`,
    method: "post",
  },

  //collector
  collectorForm: {
    url: `${backendDomin}/api/collector-form`,
    method: "post",
  },
  allCollector: {
    url: `${backendDomin}/api/get-collector`,
    method: "get",
  },
  updateCollector: {
    url: `${backendDomin}/api/update-collector`,
    method: "post",
  },

  // email
  send_email: {
    url: `${backendDomin}/api/send-email`,
    method: "post",
  },
  get_emails: {
    url: `${backendDomin}/api/get-emails`,
    method: "get",
  },
  send_email_message: {
    url: `${backendDomin}/api/send-message`,
    method: "post",
  },
  store_email: {
    url: `${backendDomin}/api/store-message`,
    method: "post",
  },
  get_send_message: {
    url: `${backendDomin}/api/get-send-message`,
    method: "post",
  },

  // Waste Collection
  send_waste: {
    url: `${backendDomin}/api/send-waste`,
    method: "post",
  },
  get_all_waste: {
    url: `${backendDomin}/api/get-allwaste`,
    method: "get",
  },
  get_user_waste: {
    url: `${backendDomin}/api/get-userwaste`,
    method: "get",
  },
  get_single_waste: (id) => ({
    url: `${backendDomin}/api/get-wastcollec/${id}`,
    method: "get",
  }),
  update_waste: (id) => ({
    url: `${backendDomin}/api/update-waste/${id}`,
    method: "put",
  }),
  update_waste_status: (id) => ({
    url: `${backendDomin}/api/update-waste-state/${id}/status`,
    method: "put",
  }),
  delete_waste: (id) => ({
    url: `${backendDomin}/api/delete-wastereq/${id}`,
    method: "delete",
  }),

  //feedback
  send_feedback: {
    url: `${backendDomin}/api/add-feedback`,
    method: "post",
  },
  get_feedback: {
    url: `${backendDomin}/api/get-feedback`,
    method: "get",
  },
  delete_feedback: {
    url: `${backendDomin}/api/delete-feedback`,
    method: "post",
  },

  // Tasks
  assign_task: {
    url: `${backendDomin}/api/tasks/assign`,
    method: "post",
  },
  get_collector_tasks: (email) => ({
    url: `${backendDomin}/api/tasks/${email}`,
    method: "get",
  }),
};

export default SummaryApi;
