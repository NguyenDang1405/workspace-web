import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppIcons } from '@/components/icons/AppIcons';

interface SubNavItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
}

export const AnalyticsSubNav: React.FC = () => {
  const navItems: SubNavItem[] = [
    {
      to: '/analytics/standup',
      label: 'Bản Tin Scrum & Học Tập',
      icon: AppIcons.users,
    },
    {
      to: '/analytics/monte-carlo',
      label: 'Mô Phỏng Rủi Ro Monte Carlo',
      icon: AppIcons.navAnalytics,
    },
    {
      to: '/profile/skill-elo',
      label: 'Hồ Sơ Năng Lực Skill Elo',
      icon: AppIcons.trophy,
    },
  ];

  return (
    <div className="flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-[#F1F5F9] p-1 text-xs">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-md px-3.5 py-1.5 font-medium transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-white text-[#4F46E5] shadow-xs font-semibold'
                  : 'text-[#64748B] hover:text-[#0F172A] hover:bg-slate-200/50'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={14}
                  className={`shrink-0 transition-colors ${
                    isActive ? 'text-[#4F46E5]' : 'text-[#64748B]'
                  }`}
                />
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        );
      })}
    </div>
  );
};

export default AnalyticsSubNav;
