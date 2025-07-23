import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Users, Wrench, BarChart2, KeyRound as UsersRound, LogOut, Settings, CheckSquare, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth, ROLES } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Header = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();

  const navItemsBase = [
    { to: '/dashboard', icon: Home, label: 'Dashboard', allowedRoles: [ROLES.GERENCIA] },
    { to: '/equipe', icon: UsersRound, label: 'Equipe', allowedRoles: [ROLES.GERENCIA] },
    { to: '/ordens-servico', icon: Wrench, label: 'Ordens de Serviço', allowedRoles: [ROLES.GERENCIA, ROLES.VENDEDOR, ROLES.TECNICO] },
    { to: '/gerenciar-encerramentos', icon: CheckSquare, label: 'Encerrar OS', allowedRoles: [ROLES.GERENCIA] },
    { to: '/clientes', icon: Users, label: 'Clientes', allowedRoles: [ROLES.GERENCIA, ROLES.VENDEDOR] },
    { to: '/relatorios', icon: BarChart2, label: 'Relatórios', allowedRoles: [ROLES.GERENCIA] },
  ];

  const navItems = user?.cargo
    ? navItemsBase.filter(item => item.allowedRoles.includes(user.cargo))
    : [];

  const handleLogout = () => {
    logout();
    toast({ title: "Logout realizado", description: "Você foi desconectado." });
    navigate('/login');
  };

  const getUserInitials = (name) => {
    if (!name) return "?";
    const names = name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-card border-b border-border shadow-sm text-card-foreground">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-6">
        <NavLink to={user?.cargo === ROLES.GERENCIA ? '/dashboard' : '/ordens-servico'} className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary whitespace-nowrap">BS TEC OS</span>
        </NavLink>

        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground'
                )
              }
            >
              <item.icon className="h-4 w-4 mr-2" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        

        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                    {getUserInitials(user.nome)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-foreground">{user.nome}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.cargo}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="md:hidden">
                {navItems.map((item) => (
                  <DropdownMenuItem key={item.to} asChild>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        cn(
                          'w-full flex items-center text-foreground',
                          isActive ? 'bg-accent text-accent-foreground' : ''
                        )
                      }
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.label}</span>
                    </NavLink>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
              </div>
              <DropdownMenuItem disabled className="text-muted-foreground">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações (breve)</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:bg-red-500/10 focus:text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};

export default Header;