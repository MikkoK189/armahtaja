import format from "date-fns/format";

function getOperationDateString(unixTime : number) : string {
  const date = new Date(unixTime * 1000);
  const formattedDate = format(date, "dd.MM.yy");

  return formattedDate;
}

function getOperationTimeString(unixTime : number) : string {
  const date = new Date(unixTime * 1000);
  const formattedDate = format(date, "kk:mm");

  return formattedDate;
}

export { getOperationDateString, getOperationTimeString };
