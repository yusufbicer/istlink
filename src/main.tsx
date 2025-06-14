
import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n'
import i18n from './i18n'

// Debug i18n initialization
console.log('i18n initialized with language:', i18n.language);
console.log('Available resources:', Object.keys(i18n.options.resources || {}));

// Ensure we have a valid DOM element before rendering
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  console.error("Failed to find root element");
}
