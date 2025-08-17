import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, X, Menu } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Team, Member, GoalStatusType } from '../types/index';

interface SidebarProps {
  teams: Team[];
  selectedMember: Member | null;
  onMemberSelect: (member: Member) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ teams, selectedMember, onMemberSelect }) => {
  const [expandedTeams, setExpandedTeams] = useState<Record<string, boolean>>({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // set initial
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTeam = (teamId: string) => {
    setExpandedTeams(prev => ({
      ...prev,
      [teamId]: !prev[teamId]
    }));
  };

  const getStatusColor = (status: GoalStatusType) => {
    switch (status) {
      case 'achieved':
        return 'bg-green-100 border-green-200 text-green-800';
      case 'not_achieved':
        return 'bg-red-100 border-red-200 text-red-800';
      case 'in_progress':
        return 'bg-amber-100 border-amber-200 text-amber-800';
      default:
        return 'bg-gray-100 border-gray-200 text-gray-800';
    }
  };

  const sidebarContent = (
    <div className="w-80 bg-white border-r border-gray-200 h-full overflow-y-auto z-50">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Ma'man (مأمن)</h1>
        <button
          onClick={() => setSidebarOpen(false)}
          title="Close sidebar"
          aria-label="Close sidebar"
          className="md:hidden"
        >
          <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
        </button>
      </div>

      <div className="p-4">
        {teams.map((team) => {
          const IconComponent = (Icons as any)[team.icon];
          const isExpanded = expandedTeams[team.id];

          return (
            <div key={team.id} className="mb-4">
              <button
                onClick={() => toggleTeam(team.id)}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${team.color} text-white`}>
                    <IconComponent size={20} />
                  </div>
                  <span className="font-semibold text-gray-900">{team.name} Team</span>
                  <span className="text-sm text-gray-500">({team.members.length})</span>
                </div>
                {isExpanded ? (
                  <ChevronDown size={20} className="text-gray-400" />
                ) : (
                  <ChevronRight size={20} className="text-gray-400" />
                )}
              </button>

              {isExpanded && (
                <div className="mt-2 ml-4 space-y-2">
                  {team.members.map((member) => (
                    <button
                      key={member.id}
                      onClick={() => {
                        onMemberSelect(member);
                        if (isMobile) setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                        selectedMember?.id === member.id
                          ? 'bg-blue-50 border-l-4 border-blue-500'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 text-left">
                        <div className="font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.lastWeekHours}h this week</div>
                      </div>
                      <div className={`w-3 h-3 rounded-full border-2 ${getStatusColor(member.goalStatus)}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Sidebar on desktop */}
      <div className="hidden md:block h-screen">{sidebarContent}</div>

      {/* Sidebar on mobile as overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-30" onClick={() => setSidebarOpen(false)} />
          <div className="relative h-full">{sidebarContent}</div>
        </div>
      )}

      {/* Floating Icon Button to Open Sidebar */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          title="Open sidebar"
          aria-label="Open sidebar"
          className="fixed top-4 left-4 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg z-50 md:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}
    </>
  );
};

export default Sidebar;
