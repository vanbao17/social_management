export function formatDate(dateStr) {
  if (typeof dateStr === "string") {
    const datePart = dateStr.split("T")[0];
    return datePart;
  } else {
    console.error("dateStr không phải là chuỗi:", dateStr);
    return null;
  }
}
export function getLast7Days() {
  const today = new Date();
  const last7Days = [];

  // Thêm ngày hiện tại
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  last7Days.push(`${year}-${month}-${day}`);

  // Thêm 6 ngày trước đó
  for (let i = 1; i <= 6; i++) {
    const pastDate = new Date();
    pastDate.setDate(today.getDate() - i);

    const pastYear = pastDate.getFullYear();
    const pastMonth = String(pastDate.getMonth() + 1).padStart(2, "0");
    const pastDay = String(pastDate.getDate()).padStart(2, "0");

    last7Days.push(`${pastYear}-${pastMonth}-${pastDay}`);
  }

  return last7Days.reverse();
}
