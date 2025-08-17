import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Course } from '../types/student';

interface AddCourseFormProps {
  onAddCourse: (course: Omit<Course, 'crsId'>) => void;
}

export const AddCourseForm: React.FC<AddCourseFormProps> = ({ onAddCourse }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    totalHours: '',
    elapsedHours: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) return;
    
    const totalHours = Math.max(1, parseInt(formData.totalHours) || 1);
    const elapsedHours = Math.max(0, Math.min(totalHours, parseInt(formData.elapsedHours) || 0));
    const progress = Math.round((elapsedHours / totalHours) * 100 * 10) / 10;

    onAddCourse({
      name: formData.name.trim(),
      totalHours,
      elapsedHours,
      progress
    });

    setFormData({ name: '', totalHours: '', elapsedHours: '' });
    setIsOpen(false);
  };

  const handleClose = () => {
    setFormData({ name: '', totalHours: '', elapsedHours: '' });
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-white border-2 border-dashed border-gray-300 rounded-xl p-8 text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors duration-200 flex flex-col items-center gap-2"
      >
        <Plus className="w-8 h-8" />
        <span className="font-medium">Add New Course</span>
      </button>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Add New Course</h3>
        <button
          onClick={handleClose}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter course name"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Hours</label>
            <input
              type="number"
              min="1"
              value={formData.totalHours}
              onChange={(e) => setFormData(prev => ({ ...prev, totalHours: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="40"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Elapsed Hours</label>
            <input
              type="number"
              min="0"
              value={formData.elapsedHours}
              onChange={(e) => setFormData(prev => ({ ...prev, elapsedHours: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors duration-200 font-medium"
          >
            Add Course
          </button>
        </div>
      </form>
    </div>
  );
};