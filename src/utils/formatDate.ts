import dayjs from "dayjs";
export const formatDateToMangadexFormat = (date: Date) => {
  return date.toISOString().split(".")[0]; // Loại bỏ phần ".000Z" để giữ lại "YYYY-MM-DDTHH:MM:SS"
};
export const formatDate = (dateString: string | number) => {
  if (!dateString) return "";
  return dayjs(dateString).format("DD/MM/YYYY");
};
