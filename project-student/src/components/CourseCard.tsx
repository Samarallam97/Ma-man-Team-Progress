import React, { useState } from 'react';
import { Edit2, Trash2, Save, X } from 'lucide-react';
import { Course } from '../types/student';

interface CourseCardProps {
  course: Course;
  onUpdate: (course: Course) => void;
  onDelete: (courseId: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onUpdate,
  onDelete
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: course.name,
    totalHours: course.totalHours.toString(),
    elapsedHours: course.elapsedHours.toString()
  });

  const handleSave = () => {
    const totalHours = Math.max(1, parseInt(editData.totalHours) || 1);
    const elapsedHours = Math.max(0, Math.min(totalHours, parseInt(editData.elapsedHours) || 0));
    const progress = Math.round((elapsedHours / totalHours) * 100 * 10) / 10;

    onUpdate({
      ...course,
      name: editData.name.trim() || course.name,
      totalHours,
      elapsedHours,
      progress
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: course.name,
      totalHours: course.totalHours.toString(),
      elapsedHours: course.elapsedHours.toString()
    });
    setIsEditing(false);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={editData.name}
            onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Course name"
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Hours</label>
              <input
                type="number"
                min="1"
                value={editData.totalHours}
                onChange={(e) => setEditData(prev => ({ ...prev, totalHours: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Elapsed Hours</label>
              <input
                type="number"
                min="0"
                value={editData.elapsedHours}
                onChange={(e) => setEditData(prev => ({ ...prev, elapsedHours: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button
              onClick={handleCancel}
              className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors duration-200 flex items-center gap-1"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{course.name}</h3>
            <div className="flex gap-1 ml-2">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(course.crsId)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progress</span>
              <span className="font-medium">{course.progress}%</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full ${getProgressColor(course.progress)} transition-all duration-500 ease-out`}
                style={{ width: `${course.progress}%` }}
              />
            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <span>{course.elapsedHours}h completed</span>
              <span>{course.totalHours}h total</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
