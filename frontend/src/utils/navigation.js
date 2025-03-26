export const redirectToDashboard = (navigate, userType) => {
  if (userType === "1") {
    navigate("/company-dashboard");
  } else {
    navigate("/user-dashboard");
  }
};
