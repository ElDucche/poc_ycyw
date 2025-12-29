// Polyfill for global object
declare const global: any;

if (typeof global === 'undefined') {
  (window as any).global = window;
}