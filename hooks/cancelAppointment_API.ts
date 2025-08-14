export const cancelAppointment = async (
  courseId: string,
  phone: string
): Promise<{ success: boolean; message?: string; error?: string }> => {
  try {
    const url = `http://crm.comarkit.com/api/flow/cancel_booking.php?phone=${phone}&course_id=${courseId}`;
    const res = await fetch(url);
    const json = await res.json();
    return {
      success: json.success,
      message: json.message,
      error: json.error,
    };
  } catch (error) {
    return {
      success: false,
      error: "An error occurred while cancelling the booking.",
    };
  }
};
