import { useContext, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { MdExpandMore } from "react-icons/md";
import WebContext from "../../Context/WebContext";

const FAQSection = () => {
  const { theme } = useContext(WebContext);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqs = [
    {
      id: "panel1",
      question: "How do I start importing/exporting on IE Hub?",
      answer:
        "To start, simply create an account, verify your business documents, and browse through our global product listings or post your own trade leads.",
    },
    {
      id: "panel2",
      question: "Is the payment system secure?",
      answer:
        "Yes, we use industry-standard encryption and secure payment gateways. We also offer trade assurance to protect both buyers and sellers during transactions.",
    },
    {
      id: "panel3",
      question: "How are exporters verified?",
      answer:
        "Every exporter goes through a multi-step verification process, including business license checks, past trade history, and physical address verification.",
    },
    {
      id: "panel4",
      question: "Do you provide logistics support?",
      answer:
        "Absolutely! We are partnered with leading global logistics providers like DHL and FedEx to ensure your goods reach their destination safely and on time.",
    },
  ];

  return (
    <section
      className={`w-full py-16 px-5 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10" data-aos="fade-up">
          <h2 className="md:text-4xl text-2xl font-bold mb-3">
            Frequently Asked Questions
          </h2>
          <p
            className={`${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Have questions about our global trade hub? Find the answers here.
          </p>
        </div>

        <div className="space-y-4" data-aos="fade-up" data-offset="200">
          {faqs.map((faq) => (
            <Accordion
              key={faq.id}
              expanded={expanded === faq.id}
              onChange={handleChange(faq.id)}
              sx={{
                backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                color: theme === "dark" ? "#ffffff" : "#000000",
                borderRadius: "10px !important",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                "&:before": { display: "none" },
                border:
                  theme === "dark" ? "1px solid #374151" : "1px solid #e5e7eb",
              }}
            >
              <AccordionSummary
                expandIcon={
                  <MdExpandMore
                    className={theme === "dark" ? "text-white" : "text-black"}
                  />
                }
                sx={{
                  padding: "10px 20px",
                  "& .MuiTypography-root": {
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                  },
                }}
              >
                <Typography>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: "0 20px 20px", opacity: 0.8 }}>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
