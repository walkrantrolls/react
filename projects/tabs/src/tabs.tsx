import { useState } from "react";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("html");
  const handleClick = (tabKey: string) => {
    setActiveTab(tabKey);
  };
  return (
    <div>
      <div>
        <button onClick={() => handleClick("html")}>HTML</button>
        <button onClick={() => handleClick("css")}>CSS</button>
        <button onClick={() => handleClick("js")}>JavaScript</button>
      </div>
      <div>
        <p className={activeTab === "html" ? "active" : ""}>
          The HyperText Markup Language or HTML is the standard markup language
          for documents designed to be displayed in a web browser.
        </p>
        <p className={activeTab === "css" ? "active" : ""}>
          Cascading Style Sheets is a style sheet language used for describing
          the presentation of a document written in a markup language such as
          HTML or XML.
        </p>
        <p className={activeTab === "js" ? "active" : ""}>
          JavaScript, often abbreviated as JS, is a programming language that is
          one of the core technologies of the World Wide Web, alongside HTML and
          CSS.
        </p>
      </div>
    </div>
  );
}
