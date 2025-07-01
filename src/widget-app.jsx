import WidgetButton from "./components/widget-button";
import WidgetComponent from "./components/widget-component";
import useWidgetStore from "./store";

export default function WidgetApp() {
  const isOpen = useWidgetStore((s) => s.isOpen);

  return (
    <>
      <WidgetButton />
      {isOpen && (
        <div className="fixed bottom-20 right-5 z-50">
          <WidgetComponent />
        </div>
      )}
    </>
  );
}
