import React from 'react';
import {
  Clock,
  Target,
  TrendingUp,
  BookOpen,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import { Member, GoalStatusType } from '../types/index';

interface MemberDashboardProps {
  member: Member | null;
}

const MemberDashboard: React.FC<MemberDashboardProps> = ({ member }) => {
  if (!member) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <BookOpen size={64} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">Select a Team Member</h3>
          <p className="text-gray-600">
            Choose a member from the sidebar to view their dashboard
          </p>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: GoalStatusType) => {
    switch (status) {
      case 'achieved':
        return <CheckCircle className="text-green-500" size={24} />;
      case 'not_achieved':
        return <XCircle className="text-red-500" size={24} />;
      case 'in_progress':
        return <AlertCircle className="text-amber-500" size={24} />;
      default:
        return <AlertCircle className="text-gray-500" size={24} />;
    }
  };

  const getStatusText = (status: GoalStatusType) => {
    switch (status) {
      case 'achieved':
        return 'Goal Achieved';
      case 'not_achieved':
        return 'Goal Not Met';
      case 'in_progress':
        return 'In Progress';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status: GoalStatusType) => {
    switch (status) {
      case 'achieved':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'not_achieved':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'in_progress':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const weeklyGoalPercentage = Math.min((member.lastWeekHours / 25) * 100, 100);

  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto">
      <div className="p-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{member.name}</h2>
                <p className="text-gray-600">{member.email}</p>
              </div>
            </div>

            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border w-fit text-sm ${getStatusColor(
                member.goalStatus
              )}`}
            >
              {getStatusIcon(member.goalStatus)}
              <span className="font-medium">{getStatusText(member.goalStatus)}</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Hours</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{member.averageWeekHours}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Clock className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Week Hours</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{member.lastWeekHours}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Goal Progress</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {Math.round(weeklyGoalPercentage)}%
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Target className="text-purple-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Courses</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {member.activeCoursesCount}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <BookOpen className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Goal Progress */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Goal Progress</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Target: 25 hours/week</span>
            <span className="text-sm font-medium text-gray-900">
              {member.lastWeekHours}/25 hours
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                weeklyGoalPercentage >= 100
                  ? 'bg-green-500'
                  : weeklyGoalPercentage >= 80
                  ? 'bg-amber-500'
                  : 'bg-red-500'
              }`}
              style={{ width: `${weeklyGoalPercentage}%` }}
            />
          </div>
        </div>

        {/* Courses Progress */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Course Progress</h3>
          <div className="space-y-6">
            {member.courses.map((course, index) => (
              <div
                key={index}
                className="border-b border-gray-100 last:border-b-0 pb-6 last:pb-0"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{course.name}</h4>
                  <span className="text-sm font-medium text-gray-600">
                    {course.progress}% Complete
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 whitespace-nowrap">
                    {course.totalHours}h total
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
