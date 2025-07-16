// Note: This is for production uncomment when done with development 

// import ReactDOM from 'react-dom/client';
// import WidgetApp from './widget-app';
// import unoCSS from './uno.css'; // ← load CSS as string

// function mountWidget() {
//   if (document.getElementById('chat-support-widget-host')) return;

//   const container = document.createElement('div');
//   container.id = 'chat-support-widget-host';
//   document.body.appendChild(container);

//   const shadowRoot = container.attachShadow({ mode: 'open' });

//   const styleTag = document.createElement('style');
//   styleTag.textContent = unoCSS;
//   shadowRoot.appendChild(styleTag);

//   const appContainer = document.createElement('div');
//   shadowRoot.appendChild(appContainer);

//   ReactDOM.createRoot(appContainer).render(<WidgetApp />);
// }

// export function initChatWidget(options = {}) {
//   const { delay = 0 } = options;
//   if (delay > 0) setTimeout(mountWidget, delay);
//   else mountWidget();
// }

// // Auto-init by default after 3s
// initChatWidget({ delay: 3000 });



// Note: This is for development purpose
import ReactDOM from 'react-dom/client';
import WidgetApp from './widget-app';
import cssText from './index.css?inline';
import { SWRConfig } from 'swr';
import { fetcher } from './lib/api';

const isDev = import.meta.env.MODE === 'development';
function getWidgetIdFromScriptTag() {
  const script = document.currentScript || [...document.querySelectorAll('script')].find(s => s.src.includes('chat-widget'));
  const url = new URL(script?.src || '');
  return url.searchParams.get('id'); // extract ?id=xyz
}

function mountWidget() {
  if (document.getElementById('chat-support-widget-host')) return;

  const widgetId = getWidgetIdFromScriptTag();
  if (!widgetId) {
    console.warn('No widget ID found in script tag URL.');
    return;
  }

  const container = document.createElement('div');
  container.id = 'chat-support-widget-host';
  document.body.appendChild(container);

  let rootTarget;

  if (isDev) {
    rootTarget = container;
  } else {
    const shadowRoot = container.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = cssText;
    shadowRoot.appendChild(style);

    rootTarget = document.createElement('div');
    shadowRoot.appendChild(rootTarget);
  }

  ReactDOM.createRoot(rootTarget).render(<SWRConfig value={{ fetcher, shouldRetryOnError: false }}>
    <WidgetApp widgetId={widgetId} />
  </SWRConfig>);
}


export function initChatWidget(options = {}) {
  const { delay = 0 } = options;
  setTimeout(mountWidget, delay);
}

// Auto-initialize
initChatWidget({ delay: 1000 });
