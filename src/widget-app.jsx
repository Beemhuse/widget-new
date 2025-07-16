import React from 'react';
import WidgetButton from "./components/widget-button";
import WidgetComponent from "./components/widget-component";
import useWidgetStore from "./store";
import useSWR from 'swr';
import { fetcher } from './lib/api';

export default function WidgetApp({widgetId="	43bd07e4-8ce0-4f64-9c87-12d414fd13a1"}) {
  const isOpen = useWidgetStore((s) => s.isOpen);
const { data, error, isLoading } = useSWR(
    widgetId ? `business/public-business/${widgetId}/` : null,
    fetcher
  );
  console.log(data)
  return (
    <>
      <WidgetButton />
      {isOpen && (
        <div className="fixed bottom-20 right-5 z-50">
          <WidgetComponent data={data} />
        </div>
      )}
    </>
  );
}
