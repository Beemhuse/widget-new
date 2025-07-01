
import useWidgetStore from "../store";

export default function WidgetButton() {
  const toggle = useWidgetStore((s) => s.toggle);

  return (
    <button
      onClick={toggle}
      className="fixed bottom-5 right-5 z-50 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg text-lg"
    >
      💬
    </button>
  );
}
