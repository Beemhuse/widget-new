import ReactDOM from 'react-dom/client';
import WidgetApp from './widget-app';
import unoCSS from './uno.css'; // ← load CSS as string

function mountWidget() {
  if (document.getElementById('chat-support-widget-host')) return;

  const container = document.createElement('div');
  container.id = 'chat-support-widget-host';
  document.body.appendChild(container);

  const shadowRoot = container.attachShadow({ mode: 'open' });

  const styleTag = document.createElement('style');
  styleTag.textContent = unoCSS;
  shadowRoot.appendChild(styleTag);

  const appContainer = document.createElement('div');
  shadowRoot.appendChild(appContainer);

  ReactDOM.createRoot(appContainer).render(<WidgetApp />);
}

export function initChatWidget(options = {}) {
  const { delay = 0 } = options;
  if (delay > 0) setTimeout(mountWidget, delay);
  else mountWidget();
}

// Auto-init by default after 3s
initChatWidget({ delay: 3000 });
