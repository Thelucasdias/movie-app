const formatDate = (date: string | undefined | null) => {
  if (!date) return "";
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};

const formatTime = (time: string) => {
  const [hours, minutes] = time.split(":");
  return `${hours}h ${minutes}m`;
};

export { formatDate, formatTime };
