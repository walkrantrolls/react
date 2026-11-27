import Tabs from "./tabs";

const TABS_DATA = [
  {
    label: "HTML",
    value: "html",
    panel: (
      <p>
        The HyperText Markup Language or HTML is the standard markup language
        for documents designed to be displayed in a web browser.
      </p>
    ),
  },
  {
    label: "CSS",
    value: "css",
    panel: (
      <p>
        Cascading Style Sheets is a style sheet language used for describing the
        presentation of a document written in a markup language such as HTML or
        XML.
      </p>
    ),
  },
  {
    label: "Javascript",
    value: "js",
    panel: (
      <p>
        JavaScript, often abbreviated as JS, is a programming language that is
        one of the core technologies of the World Wide Web, alongside HTML and
        CSS.
      </p>
    ),
  },
];

export default function App() {
  return <Tabs items={TABS_DATA} />;
}
