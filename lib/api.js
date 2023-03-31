export const sendContactForm = async (data) =>
  fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
      Accept: "applicatio/json",
    },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to send a message");
    return res.json();
  });
