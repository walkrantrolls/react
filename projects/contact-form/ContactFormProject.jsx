import "./ContactFormProject.css";

export default function ContactFormProject() {
  return (
    <iframe
      className="contact-form-project-frame"
      src={`${import.meta.env.BASE_URL}contact-form-demo.html`}
      title="Contact form demo"
    />
  );
}
