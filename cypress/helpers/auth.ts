class auth {
  getApiHeader() {
    return {
      Authorization: "Bearer ",
      Accept: "application/json",
    };
  }
}
export default new auth();
