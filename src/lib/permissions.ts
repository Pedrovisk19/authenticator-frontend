export function getPermissions() {
  if (typeof window === 'undefined') return null;

  try {
    return JSON.parse(localStorage.getItem('permissions') || 'null');
  } catch {
    return null;
  }
}