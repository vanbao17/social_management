import { format, parse } from "date-fns";

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
export const formatOldDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  return `${year}/${month}/${day}`;
};
export const formatNewDate = (dateString) => {
  const parsedDate = new Date(dateString);
  const formattedDate = format(parsedDate, "yyyy-MM-dd HH:mm:ss");
  return formattedDate;
};
export const formatNormalDate = (dateString) => {
  const parsedDate = new Date(dateString);
  const formattedDate = format(parsedDate, "dd-MM-yyyy");
  return formattedDate;
};
export const formatDatePass = (dateString) => {
  const format = dateString.split("/");
  return format.join("");
};
const formatDateEx = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}/${month}/${day}`;
};
export const excelDateToJSDate = (excelDate) => {
  const excelStartDate = new Date(1900, 0, 1);
  const jsDate = new Date(
    excelStartDate.getTime() + (excelDate - 1) * 24 * 60 * 60 * 1000
  );
  const result = formatDateEx(jsDate);
  return result;
};
export function convertDateFormat(dateStr) {
  const [day, month, year] = dateStr.split("-");
  const formattedDay = day.padStart(2, "0");
  const formattedMonth = month.padStart(2, "0");
  return `${year}-${formattedMonth}-${formattedDay}`;
}
