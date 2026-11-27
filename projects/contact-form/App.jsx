import submitForm from "./submitForm.js";

export default function App() {
  // GFE uses this handler to intercept form submission while checking the solution.
  return (
    <form
      method="post"
      action="https://questions.greatfrontend.com/api/questions/contact-form"
      onSubmit={submitForm}
    >
      <div>
        <label htmlFor="name-input">Name:</label>
        <input type="text" id="name-input" name="name" placeholder="Name" />
      </div>
      <div>
        <label htmlFor="email-input">Email:</label>
        <input type="email" id="email-input" name="email" placeholder="Email" />
      </div>
      <div>
        <label htmlFor="message-input">Message: </label>
        <textarea
          id="message-input"
          name="message"
          placeholder="Message"
        ></textarea>
      </div>
      <input type="submit" value="Submit" />
    </form>
  );
}
