import React from "react";

import useWidgetStore from "../store";

export default function WidgetButton({ position }) {
  const toggle = useWidgetStore((s) => s.toggle);
console.log(toggle)
  return (
    <img
      onClick={toggle}
      src="https://res.cloudinary.com/dj3zrsni6/image/upload/v1705926227/chat/Trigger_ntlmi7.png"
      alt="hello"
      className={` andro-widget-button fixed  ${
        position || "bottom-5 right-5"
      }  z-50 rounded-full cursor-pointer`}
    />
  );
}
