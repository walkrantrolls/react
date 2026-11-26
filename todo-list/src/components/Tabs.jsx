import { useState } from "react";

export default function Tabs({ items, defaultValue }) {
  const [activeValue, setActiveValue] = useState(
    () => defaultValue ?? items[0]?.value ?? null,
  );

  if (items.length === 0) return null;

  return (
    <div className="tabs-component">
      <div className="tabs-component-list">
        {items.map(({ label, value }) => {
          const selected = value === activeValue;

          return (
            <button
              className={`tabs-component-tab ${selected ? "is-selected" : ""}`}
              key={value}
              onClick={() => setActiveValue(value)}
              type="button"
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="tabs-component-panels">
        {items.map(({ panel, value }) => (
          <div className="tabs-component-panel" hidden={value !== activeValue} key={value}>
            {panel}
          </div>
        ))}
      </div>
    </div>
  );
}
