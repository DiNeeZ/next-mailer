import { mailOptions, transporter } from "@/config/nodemailer";
import { getEmailTemplate } from "@/lib/templates";

const CONTACT_MESSAGE_FIELDS = {
  name: "Name",
  email: "Email",
  subject: "Subject",
  message: "Message",
};

const generateEmailContent = (data) => {
  const getStringItem = (key, value) =>
    `${CONTACT_MESSAGE_FIELDS[key]}: \n${value} \n\n`;

  const getHtmlItem = (key, value) => `
    <h1 class="form-heading" align="left">${CONTACT_MESSAGE_FIELDS[key]}</h1>
    <p class="form-answer" align="left">${value}</p>
  `;

  const stringData = Object.entries(data).reduce(
    (str, [key, value]) => (str += getStringItem(key, value)),
    ""
  );

  const htmlData = Object.entries(data).reduce(
    (str, [key, value]) => (str += getHtmlItem(key, value)),
    ""
  );

  return {
    text: stringData,
    html: getEmailTemplate(htmlData),
  };
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    const { name, email, subject, message } = data;
    if (!name && !email && !subject && !message) {
      return res.status(400).json({ message: "Bad request" });
    }

    try {
      await transporter.sendMail({
        ...mailOptions,
        ...generateEmailContent(data),
        subject,
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  }

  return res.status(400).json({ message: "Bad request" });
};

export default handler;
