import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, FileText, Kanban, Library, DollarSign, BarChart, Brain, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Clientes', path: '/clients', icon: Users },
  { name: 'Calendário', path: '/calendar', icon: Calendar },
  { name: 'Conteúdos', path: '/contents', icon: FileText },
  { name: 'Pipeline', path: '/pipeline', icon: Kanban },
  { name: 'Biblioteca', path: '/library', icon: Library },
  { name: 'Financeiro', path: '/finance', icon: DollarSign },
  { name: 'Relatórios', path: '/reports', icon: BarChart },
  { name: 'Inteligência Artificial', path: '/ai', icon: Brain },
  { name: 'Configurações', path: '/settings', icon: Settings },
];

export function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 font-bold text-xl text-navy-900">Marketing ERP</div>
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => cn(
                "flex items-center px-4 py-2 text-gray-700 rounded-md transition-colors",
                isActive ? "bg-gray-100 text-navy-900 font-medium" : "hover:bg-gray-100 hover:text-navy-900"
              )}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-8 justify-between">
          <div>Breadcrumb</div>
          <div className="w-8 h-8 rounded-full bg-navy-900" />
        </header>
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
