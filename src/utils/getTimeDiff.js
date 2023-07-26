import moment from "moment";

export default function getTimeDiff(timestamp1, timestamp2) {
  const diff = moment(timestamp2).diff(moment(timestamp1));

  // Convert the difference to duration and format it
  const duration = moment.duration(diff);

  return `${duration.hours() ? `${duration.hours()} H` : ""} ${
    duration.minutes() ? `${duration.minutes()} M` : ""
  }`;
}
