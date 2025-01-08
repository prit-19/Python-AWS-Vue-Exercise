export const manageResponse = (response: any) => {
  if (response?.statusCode != 200) {
    throw new Error(
      JSON.parse(response?.body || {})?.error || "Something went wrong"
    );
  }
};
