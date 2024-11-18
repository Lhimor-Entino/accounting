export const getDateTime = () => {
  const currentDate: Date = new Date();

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  const formattedDateTime: string = currentDate.toLocaleString('en-US', options).replace(',', ' at');
  return formattedDateTime // Example output: "Friday, February 10, 2023 at 5:57 PM"

}
export const getFormattedDateString = (selectedDate:string) => {
  const userSelectedDate = new Date(selectedDate);  // This would be the date the user selects
  
  const formattedDate = userSelectedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short', // Abbreviated month name (Jan, Feb, Mar, ...)
    day: 'numeric'
  });
  
  return formattedDate;
}

export const isNow = (selectedDate:string) => {
  // Get the current date in yyyy-mm-dd format
  const currentDate = new Date();
  const formattedCurrentDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

  // Assume the user-selected date is in a Date object (e.g., from an input or date picker)
  const userSelectedDate = new Date(selectedDate);  // This would be the date the user selects
  const formattedUserSelectedDate = `${userSelectedDate.getFullYear()}-${(userSelectedDate.getMonth() + 1).toString().padStart(2, '0')}-${userSelectedDate.getDate().toString().padStart(2, '0')}`;

  // Compare the two dates
  if (formattedCurrentDate === formattedUserSelectedDate) {
    return true
  } else {
    return false
  }
}