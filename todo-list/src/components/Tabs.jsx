import { useId, useRef, useState } from "react";

export default function Tabs({ items, defaultValue, ariaLabel = "Tabs" }) {
  const instanceId = useId();
  const tabRefs = useRef(new Map());
  const [activeValue, setActiveValue] = useState(() => {
    if (items.some((item) => item.value === defaultValue)) return defaultValue;
    return items[0]?.value ?? null;
  });

  function handleKeyDown(event, currentIndex) {
    let nextIndex;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (currentIndex + 1) % items.length;
        break;
      case "ArrowLeft":
        nextIndex = (currentIndex - 1 + items.length) % items.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = items.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const nextItem = items[nextIndex];
    setActiveValue(nextItem.value);
    tabRefs.current.get(nextItem.value)?.focus();
  }

  if (items.length === 0) return null;

  return (
    <div className="tabs-component">
      <div className="tabs-component-list" role="tablist" aria-label={ariaLabel}>
        {items.map((item, index) => {
          const selected = item.value === activeValue;
          const tabId = `${instanceId}-tab-${item.value}`;
          const panelId = `${instanceId}-panel-${item.value}`;

          return (
            <button
              aria-controls={panelId}
              aria-selected={selected}
              className={`tabs-component-tab ${selected ? "is-selected" : ""}`}
              id={tabId}
              key={item.value}
              onClick={() => setActiveValue(item.value)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              ref={(node) => {
                if (node) tabRefs.current.set(item.value, node);
                else tabRefs.current.delete(item.value);
              }}
              role="tab"
              tabIndex={selected ? 0 : -1}
              type="button"
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="tabs-component-panels">
        {items.map((item) => {
          const selected = item.value === activeValue;
          const tabId = `${instanceId}-tab-${item.value}`;
          const panelId = `${instanceId}-panel-${item.value}`;

          return (
            <div
              aria-labelledby={tabId}
              className="tabs-component-panel"
              hidden={!selected}
              id={panelId}
              key={item.value}
              role="tabpanel"
              tabIndex={0}
            >
              {item.panel}
            </div>
          );
        })}
      </div>
    </div>
  );
}
