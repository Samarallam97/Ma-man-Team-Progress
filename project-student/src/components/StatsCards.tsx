import React, { useState } from 'react';
import { Clock, TrendingUp, BookOpen, Save, X } from 'lucide-react';

interface StatsCardsProps {
  totalHours: number;
  lastWeekHours: number;
  courseCount: number;
  onUpdateLastWeek: (hours: number) => void; // callback to save DB
}

export const StatsCards: React.FC<StatsCardsProps> = ({
  totalHours,
  lastWeekHours,
  courseCount,
  onUpdateLastWeek
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editHours, setEditHours] = useState(lastWeekHours);

  const handleSave = () => {
    const value = Math.max(0, editHours); // prevent negative hours
    console.log(value);
    onUpdateLastWeek(value); // save to DB
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditHours(lastWeekHours); // revert to previous value
    setIsEditing(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Hours */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Hours</p>
            <p className="text-2xl font-bold text-gray-900">{totalHours}</p>
          </div>
        </div>
      </div>

      {/* Last Week Hours Editable */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Last Week</p>
            {isEditing ? (
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  min="0"
                  value={editHours}
                  onChange={(e) => setEditHours(parseFloat(e.target.value))}
                  className="w-20 text-2xl font-bold text-gray-900 border-b border-gray-400 focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={handleSave}
                  className="p-1 bg-blue-600 text-white rounded-lg flex items-center justify-center"
                >
                  <Save className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCancel}
                  className="p-1 bg-gray-200 text-gray-700 rounded-lg flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <p
                className="text-2xl font-bold text-gray-900 cursor-pointer"
                onClick={() => setIsEditing(true)}
              >
                {lastWeekHours}h
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Active Courses */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Active Courses</p>
            <p className="text-2xl font-bold text-gray-900">{courseCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
