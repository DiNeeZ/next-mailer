import { sendContactForm } from "@/lib/api";
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const initValues = { name: "", email: "", subject: "", message: "" };

const Home = () => {
  const [values, setValues] = useState(initValues);
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  const { name, email, subject, message } = values;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = ({ target }) => {
    setTouched((prev) => ({
      ...prev,
      [target.name]: true,
    }));
  };

  const onSubmit = async () => {
    setLoading(true);

    try {
      await sendContactForm(values);
      setTouched({});
      setValues(initValues);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW={450} mt={12} className={inter.className}>
      <Heading mb={50}>Contacts</Heading>

      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "25px",
        }}
      >
        <FormControl isRequired isInvalid={touched.name && !name}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            value={name}
            errorBorderColor="red.300"
            placeholder="Your name"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <FormErrorMessage>Required</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={touched.email && !email}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            placeholder="Your email"
            value={email}
            errorBorderColor="red.300"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <FormErrorMessage>Required</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={touched.subject && !subject}>
          <FormLabel>Subject</FormLabel>
          <Input
            type="text"
            name="subject"
            placeholder="The subject of your message"
            value={subject}
            errorBorderColor="red.300"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <FormErrorMessage>Required</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={touched.message && !message}>
          <FormLabel>Message</FormLabel>
          <Textarea
            rows={7}
            type="text"
            name="message"
            placeholder="The subject of your message"
            value={message}
            errorBorderColor="red.300"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <FormErrorMessage>Required</FormErrorMessage>
        </FormControl>

        <Button
          variant="outline"
          colorScheme="blue"
          isLoading={loading}
          isDisabled={!name || !email || !subject || !message}
          onClick={onSubmit}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Home;
