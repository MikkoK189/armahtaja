import format from "date-fns/format";

export default function getOperationDateString(unixTime) {
  const date = new Date(unixTime * 1000);
  const formattedDate = format(date, "dd.MM.yy");

  return formattedDate;
}
