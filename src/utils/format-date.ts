export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return "Recent";

  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) return "Recent";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  } catch (error) {
    return "Recent";
  }
};
