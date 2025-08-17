import React, { useState, useEffect } from 'react';
import { GraduationCap, Save, CheckCircle, AlertCircle } from 'lucide-react';
import { Student, StudentSummary, Course } from './types/student';
import { api } from './services/api';
import { StudentSelector } from './components/StudentSelector';
import { StatsCards } from './components/StatsCards';
import { CourseCard } from './components/CourseCard';
import { AddCourseForm } from './components/AddCourseForm';
import { LoadingSpinner } from './components/LoadingSpinner';

function App() {
  const [students, setStudents] = useState<StudentSummary[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    if (selectedStudentId) {
      loadStudentData(selectedStudentId);
    } else {
      setSelectedStudent(null);
      setHasChanges(false);
    }
  }, [selectedStudentId]);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const studentsData = await api.getStudents();
      setStudents(studentsData);
    } catch (error) {
      console.error('Failed to load students:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStudentData = async (studentId: string) => {
    try {
      setLoading(true);
      const studentData = await api.getStudentById(studentId);
      console.log(studentData);
      
      setSelectedStudent(studentData);
      setHasChanges(false);
      setSaveStatus('idle');
    } catch (error) {
      console.error('Failed to load student data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStudentChange = (studentId: string) => {
    setSelectedStudentId(studentId);
  };

  const handleSave = async () => {
    if (!selectedStudent || !hasChanges) return;

    try {
      setSaving(true);
      const success = await api.saveStudentData(selectedStudent);
      
      if (success) {
        setHasChanges(false);
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
        setTimeout(() => setSaveStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Failed to save student data:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleCourseUpdate = (updatedCourse: Course) => {
    if (!selectedStudent) return;

    const updatedCourses = selectedStudent.courses.map(course =>
      course.crsId === updatedCourse.crsId ? updatedCourse : course
    );

    console.log(updatedCourses);
    
    const totalHours = updatedCourses.reduce((sum, course) => sum + course.elapsedHours, 0);

    setSelectedStudent({
      ...selectedStudent,
      courses: updatedCourses,
      totalHours
    });
    setHasChanges(true);
    setSaveStatus('idle');
  };


  const handleCourseDelete = (courseId: string) => {
    if (!selectedStudent) return;

    const updatedCourses = selectedStudent.courses.filter(course => course.crsId !== courseId);
    const totalHours = updatedCourses.reduce((sum, course) => sum + course.elapsedHours, 0);

    console.log(updatedCourses);

    setSelectedStudent({
      ...selectedStudent,
      courses: updatedCourses,
      totalHours
    });
    setHasChanges(true);
    setSaveStatus('idle');
  };

  const handleAddCourse = (newCourseData: Omit<Course, 'crsId'>) => {
    if (!selectedStudent) return;

    const newCourse: Course = {
      crsId: Date.now().toString(),
      ...newCourseData
    };

    const updatedCourses = [...selectedStudent.courses, newCourse];
    const totalHours = updatedCourses.reduce((sum, course) => sum + course.elapsedHours, 0);

    setSelectedStudent({
      ...selectedStudent,
      courses: updatedCourses,
      totalHours
    });
    setHasChanges(true);
    setSaveStatus('idle');
  };

const handleLastWeekUpdate = (hours: number) => {
  if (!selectedStudent) return;

  setSelectedStudent({
    ...selectedStudent,
    lastWeekHours: hours
  });
  setHasChanges(true);
  setSaveStatus('idle');
};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Student Dashboard</h1>
                <p className="text-sm text-gray-500">Track learning progress and manage courses</p>
              </div>
            </div>

            {selectedStudent && (
              <button
                onClick={handleSave}
                disabled={!hasChanges || saving}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  hasChanges && !saving
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {saving ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : saveStatus === 'success' ? (
                  <CheckCircle className="w-4 h-4" />
                ) : saveStatus === 'error' ? (
                  <AlertCircle className="w-4 h-4" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {saving ? 'Saving...' : saveStatus === 'success' ? 'Saved!' : saveStatus === 'error' ? 'Error' : 'Save Changes'}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Student Selection */}
          <StudentSelector
            students={students}
            selectedStudentId={selectedStudentId}
            onStudentChange={handleStudentChange}
            loading={loading}
          />

          {/* Student Dashboard */}
          {loading && selectedStudentId ? (
            <LoadingSpinner />
          ) : selectedStudent ? (
            <div className="space-y-8">
              {/* Stats Cards */}
              <StatsCards
                totalHours={selectedStudent.totalHours}
                lastWeekHours={selectedStudent.lastWeekHours}
                courseCount={selectedStudent.activeCoursesCount}
                onUpdateLastWeek = {handleLastWeekUpdate}
              />

              {/* Courses Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Current Courses</h2>
                  <p className="text-gray-600">Manage course progress and add new learning paths</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedStudent.courses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      onUpdate={handleCourseUpdate}
                      onDelete={handleCourseDelete}
                    />
                  ))}
                  <AddCourseForm onAddCourse={handleAddCourse} />
                </div>
              </div>
            </div>
          ) : selectedStudentId === '' ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Student</h3>
              <p className="text-gray-500">Choose a student from the dropdown to view their learning dashboard</p>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default App;