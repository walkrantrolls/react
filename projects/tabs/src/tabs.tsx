import { useState } from "react";

const TABS_DATA = [
  {
    label: "HTML",
    key: "html",
    panel: (
      <p>
        The HyperText Markup Language or HTML is the standard markup language
        for documents designed to be displayed in a web browser.
      </p>
    ),
  },
  {
    label: "CSS",
    key: "css",
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
    key: "js",
    panel: (
      <p>
        JavaScript, often abbreviated as JS, is a programming language that is
        one of the core technologies of the World Wide Web, alongside HTML and
        CSS.
      </p>
    ),
  },
];

type TabItem = Readonly<{
  value: string;
  label: React.ReactNode;
  panel: React.ReactNode;
}>;

export default function Tabs({
  defaultValue,
  items,
}: Readonly<{ defaultValue?: string; items: ReadonlyArray<TabItem> }>) {
  const [activeTab, setActiveTab] = useState(defaultValue ?? items[0].value);
  return (
    <div className="tabs">
      <div className="tabs-list">
        {items.map(({ label, value: itemValue }) => {
          const isActiveValue = itemValue === activeTab;
          return (
            <button
              key={itemValue}
              type="button"
              className={[
                "tabs-list-item",
                isActiveValue && "tabs-list-item--active",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => {
                setActiveTab(itemValue);
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div>
        {items.map(({ panel, value: itemValue }) => (
          <div key={itemValue} hidden={itemValue !== activeTab}>
            {panel}
          </div>
        ))}
      </div>
    </div>
  );
}
