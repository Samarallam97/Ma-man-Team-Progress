import React from 'react';
import { ChevronDown, User } from 'lucide-react';
import { StudentSummary } from '../types/student';

interface StudentSelectorProps {
  students: StudentSummary[];
  selectedStudentId: string;
  onStudentChange: (studentId: string) => void;
  loading: boolean;
}

export const StudentSelector: React.FC<StudentSelectorProps> = ({
  students,
  selectedStudentId,
  onStudentChange,
  loading
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <User className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Select Student</h2>
          <p className="text-sm text-gray-500">Choose a student to view their progress</p>
        </div>
      </div>
      
      <div className="relative">
        <select
          value={selectedStudentId}
          onChange={(e) => onStudentChange(e.target.value)}
          disabled={loading}
          className="w-full appearance-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <option value="">Select a student...</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
};