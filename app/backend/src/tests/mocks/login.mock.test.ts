const user = {
  email: "admin@admin.com",
  password: "secret_admin"
};

const emailInvalid = {
  email: "admin@admin",
  password: "secret_admin"
};

const passwordInvalid = {
  email: "admin@admin.com",
  password: "secret"
};

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjY5NzQ0MjExLCJleHAiOjE2Njk4MzA2MTF9.SYsfxZ7PF4wTBqPBclDFiu8F7Op4qZ07jZE68OVO9Vo`

export {
  user,
  emailInvalid,
  passwordInvalid,
  token,
}