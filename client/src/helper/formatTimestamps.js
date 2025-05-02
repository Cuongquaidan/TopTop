import { format, isToday, isThisWeek } from "date-fns";

const formatTimestamp = (timestamp) => {
  if (!timestamp) return "";
  try {
    const date = new Date(timestamp);

    if (isToday(date)) {
      return format(date, "HH:mm");
    }

    if (isThisWeek(date, { weekStartsOn: 1 })) {
      return format(date, "EEEE HH:mm");
    }

    return format(date, "dd/MM/yyyy HH:mm");
  } catch (error) {
    return "";
  }
};

export default formatTimestamp;
