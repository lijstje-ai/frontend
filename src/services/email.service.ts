import axios from "axios";

export const sendEmail = async ({
  to,
  shareLink,
}: {
  to: string;
  shareLink: string;
}) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/email/send`,
      {
        to,
        shareLink,
      },
    );

    if (response.data.success) {
      return "Verzonden! Check ook je spambox.";
    } else {
      throw new Error(response.data.message || "Failed to send email");
    }
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
