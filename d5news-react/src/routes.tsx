import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Layouts
import PublicLayout from './layouts/PublicLayout'
import MinimalLayout from './layouts/MinimalLayout'
import AdminLayout from './layouts/AdminLayout'

// Guards
import ProtectedRoute from './components/guards/ProtectedRoute'
import AdminGuard from './components/guards/AdminGuard'

// Lazy-loaded pages - Public
const Home = React.lazy(() => import('./pages/public/Home'))
const Article = React.lazy(() => import('./pages/public/Article'))
const Category = React.lazy(() => import('./pages/public/Category'))
const Search = React.lazy(() => import('./pages/public/Search'))
const Podcast = React.lazy(() => import('./pages/public/Podcast'))
const Live = React.lazy(() => import('./pages/public/Live'))
const Subscription = React.lazy(() => import('./pages/public/Subscription'))
const Checkout = React.lazy(() => import('./pages/public/Checkout'))
const Contact = React.lazy(() => import('./pages/public/Contact'))
const Legal = React.lazy(() => import('./pages/public/Legal'))

// Lazy-loaded pages - Auth
const Login = React.lazy(() => import('./pages/public/Login'))
const Register = React.lazy(() => import('./pages/public/Register'))

// Lazy-loaded pages - Protected
const Favorites = React.lazy(() => import('./pages/public/Favorites'))
const Profile = React.lazy(() => import('./pages/public/Profile'))

// Lazy-loaded pages - Admin
const AdminDashboard = React.lazy(() => import('./pages/admin/Dashboard'))
const AdminUsers = React.lazy(() => import('./pages/admin/Users'))
const AdminEditorial = React.lazy(() => import('./pages/admin/Editorial'))
const AdminPartners = React.lazy(() => import('./pages/admin/Partners'))
const AdminRadio = React.lazy(() => import('./pages/admin/Radio'))
const AdminSettings = React.lazy(() => import('./pages/admin/Settings'))
const AdminLogs = React.lazy(() => import('./pages/admin/Logs'))
const AdminIntegrations = React.lazy(() => import('./pages/admin/Integrations'))

// Lazy-loaded pages - Error
const NotFound = React.lazy(() => import('./pages/public/NotFound'))
const ServerError = React.lazy(() => import('./pages/public/ServerError'))

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#101822]">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/search" element={<Search />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/live" element={<Live />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal" element={<Legal />} />
        </Route>

        {/* Minimal layout routes (auth) */}
        <Route element={<MinimalLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<PublicLayout />}>
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        {/* Admin routes */}
        <Route element={<AdminGuard />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/editorial" element={<AdminEditorial />} />
            <Route path="/admin/partners" element={<AdminPartners />} />
            <Route path="/admin/radio" element={<AdminRadio />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/logs" element={<AdminLogs />} />
            <Route path="/admin/integrations" element={<AdminIntegrations />} />
          </Route>
        </Route>

        {/* Redirects & error pages */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/error" element={<ServerError />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}
