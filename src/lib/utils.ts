/* eslint-disable @typescript-eslint/no-explicit-any */

export function t(template: string, ...args: any[]): string {
  if (template == null) return ""
  return template.replace(/\{(\d+)\}/g, (match, index) => {
    const i = parseInt(index, 10);
    return args[i] !== undefined ? args[i] : match; // Keep placeholder if no arg
  });
}

/**
 * 
 * @returns True if the code is run on the server side, false if the code is run on the client side.
 */
export function isRunOnServer() {
  return typeof window == 'undefined'
}