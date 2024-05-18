export const proxy = "http://localhost:8000";

export const convertDateToLaravelFormat = (dateString) => {
    // Create a Date object from the string
    const date = new Date(dateString);
    
    // Get year, month (0-indexed), and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero for single-digit months
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero for single-digit days
  
    // Format the date string
    const formattedDate = `${year}-${month}-${day}`;
  
    return formattedDate;
  }