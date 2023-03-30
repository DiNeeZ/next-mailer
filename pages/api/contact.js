//Sending emails

const handler = (req, res) => {
  if (req.method === "POST") {
    const { name, email, subject, message } = req.body;
    if (!name && !email && !subject && !message) {
      return res.status(400).json({ message: "Bad request" });
    }
  }

  return res.status(400).json({ message: "Bad request" });
};

export default handler;
