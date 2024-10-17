export const formatDateToMangadexFormat = (date: Date) => {
  return date.toISOString().split(".")[0]; // Loại bỏ phần ".000Z" để giữ lại "YYYY-MM-DDTHH:MM:SS"
};
