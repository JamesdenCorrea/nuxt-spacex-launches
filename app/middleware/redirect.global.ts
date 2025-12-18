export default defineNuxtRouteMiddleware((to) => {
  const validRoutes = ['/', '/launches', '/favorites']
  const isDynamicRocketRoute = to.path.startsWith('/rockets/')
  
  // Allow valid routes and dynamic rocket routes
  if (validRoutes.includes(to.path) || isDynamicRocketRoute) {
    return
  }
  
  // Redirect all other routes to launches
  console.log(`🔀 Redirecting from ${to.path} to /launches`)
  return navigateTo('/launches')
})