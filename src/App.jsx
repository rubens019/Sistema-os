import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, useAuth, ROLES } from '@/contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import MainLayout from '@/components/layout/MainLayout';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import ClientesPage from '@/pages/ClientesPage';
import OrdensServicoPage from '@/pages/OrdensServicoPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { Loader2 } from 'lucide-react';
import { LayoutProvider } from '@/contexts/LayoutContext';

// Lazy load pages
const NovaOrdemServicoPage = lazy(() => import('@/pages/NovaOrdemServicoPage'));
const OSEncerramentoPage = lazy(() => import('@/pages/OSEncerramentoPage'));
import AvisarClientePage from '@/pages/AvisarClientePage';
const RelatoriosPage = lazy(() => import('@/pages/RelatoriosPage'));
const EquipePage = lazy(() => import('@/pages/EquipePage'));
const OSConfirmationPage = lazy(() => import('@/pages/OSConfirmationPage'));
const DetalhesOSPage = lazy(() => import('@/pages/DetalhesOSPage'));
const GerenciarEncerramentosPage = lazy(() => import('@/pages/GerenciarEncerramentosPage'));
const ImprimirGarantiaPage = lazy(() => import('@/pages/ImprimirGarantiaPage'));

const PageLoader = () => (
  <div className="flex justify-center items-center h-screen bg-background">
    <Loader2 className="h-16 w-16 animate-spin text-primary" />
  </div>
);

const RequireRole = ({ allowedRoles, children }) => {
  const authContext = useAuth();

  console.log('RequireRole - AuthContext:', authContext);

  if (!authContext) {
    console.log('No authContext, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  const { user, isLoading } = authContext;

  console.log('RequireRole - User:', user, 'Allowed:', allowedRoles, 'Loading:', isLoading);

  if (isLoading) {
    console.log('Still loading, showing page loader');
    return <PageLoader />;
  }

  if (!user) {
    console.log('No user, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.cargo)) {
    console.warn(`Access denied for role "${user.cargo}" to route requiring roles: ${allowedRoles.join(', ')}`);
    let fallbackRoute = '/login';
    if (user.cargo === ROLES.TECNICO) {
        fallbackRoute = '/ordens-servico';
    } else if (user.cargo === ROLES.VENDEDOR || user.cargo === ROLES.MASTER) {
         fallbackRoute = '/ordens-servico';
    } else if (user.cargo === ROLES.GERENCIA) {
        fallbackRoute = '/dashboard';
    }
    if (window.location.pathname === fallbackRoute && fallbackRoute !== '/login') {
        fallbackRoute = '/login';
    }
    console.log(`Redirecting denied user to: ${fallbackRoute}`);
    return <Navigate to={fallbackRoute} replace />;
  }

  console.log('Access granted, rendering children');
  return children;
};

const ProtectedRoute = ({ children }) => {
  const authContext = useAuth();

  if (!authContext) {
    return <Navigate to="/login" replace />;
  }

  const { user, isLoading } = authContext;

  if (isLoading) {
    return <PageLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (window.location.pathname === '/') {
     let defaultRoute = '/ordens-servico';
     if (user.cargo === ROLES.GERENCIA) {
         defaultRoute = '/dashboard';
     }
     return <Navigate to={defaultRoute} replace />;
  }

  return children;
};

function App() {
  return (
<AuthProvider>
  <ThemeProvider>
        <Router>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <MainLayout />
                  </ProtectedRoute>
                }
              >
                 <Route index element={<Navigate to="/" replace />} />
                 <Route
                   path="dashboard"
                   element={
                     <RequireRole allowedRoles={[ROLES.GERENCIA]}>
                       <DashboardPage />
                     </RequireRole>
                   }
                 />
                 <Route
                   path="clientes"
                   element={
                     <RequireRole allowedRoles={[ROLES.GERENCIA, ROLES.VENDEDOR, ROLES.MASTER]}>
                       <ClientesPage />
                     </RequireRole>
                   }
                 />
                 <Route
                   path="ordens-servico"
                   element={
                     <RequireRole allowedRoles={[ROLES.GERENCIA, ROLES.VENDEDOR, ROLES.TECNICO, ROLES.MASTER]}>
                       <OrdensServicoPage />
                     </RequireRole>
                   }
                 />
                 <Route
                   path="encerrar-os/:osId"
                   element={
                     <RequireRole allowedRoles={[ROLES.GERENCIA, ROLES.MASTER]}>
                       <OSEncerramentoPage />
                     </RequireRole>
                   }
                 />
                 <Route
                   path="ordens-servico/:osId" 
                   element={
                     <RequireRole allowedRoles={[ROLES.GERENCIA, ROLES.VENDEDOR, ROLES.TECNICO, ROLES.MASTER]}>
                       <DetalhesOSPage />
                     </RequireRole>
                   }
                 />
                 <Route
                   path="ordem-de-servico/nova"
                   element={
                     <RequireRole allowedRoles={[ROLES.GERENCIA, ROLES.VENDEDOR, ROLES.MASTER]}>
                       <NovaOrdemServicoPage />
                     </RequireRole>
                   }
                 />
                 <Route
                   path="os-criada/:osNumber"
                   element={
                     <RequireRole allowedRoles={[ROLES.GERENCIA, ROLES.VENDEDOR, ROLES.MASTER]}>
                       <OSConfirmationPage />
                      </RequireRole>
                    }
                 />
                 <Route
                    path="imprimir-garantia/:osId"
                    element={
                      <RequireRole allowedRoles={[ROLES.GERENCIA, ROLES.VENDEDOR, ROLES.TECNICO, ROLES.MASTER]}>
                        <ImprimirGarantiaPage />
                      </RequireRole>
                    }
                  />
                 <Route
                    path="gerenciar-encerramentos"
                    element={
                      <RequireRole allowedRoles={[ROLES.GERENCIA, ROLES.MASTER]}>
                        <GerenciarEncerramentosPage />
                      </RequireRole>
                    }
                  />
                 <Route
                   path="relatorios"
                   element={
                     <RequireRole allowedRoles={[ROLES.GERENCIA]}>
                       <RelatoriosPage />
                     </RequireRole>
                   }
                 />
                 <Route
                   path="equipe"
                   element={
                     <RequireRole allowedRoles={[ROLES.GERENCIA]}>
                       <EquipePage />
                     </RequireRole>
                   }
                 />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
          <Toaster />
        </Router>
      </ThemeProvider>
</AuthProvider>
);
}

export default App;