// Runs before React mounts to avoid a light/dark flash. Dark is the default
// unless the visitor's OS asks for light or they picked a theme before.
(function () {
  var theme = null
  try {
    theme = localStorage.getItem('theme')
  } catch {
    // Storage can be blocked (private mode); fall through to OS preference.
  }
  if (theme !== 'light' && theme !== 'dark') {
    theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  }
  if (theme === 'dark') document.documentElement.classList.add('dark')
})()
