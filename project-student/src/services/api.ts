import { Student, StudentSummary, Course } from '../types/student';

const BASE_URL = 'https://dashboard-maman.runasp.net/api';

export const api = {
  // Get all students for dropdown
  getStudents: async (): Promise<StudentSummary[]> => {
    const res = await fetch(`${BASE_URL}/members`);
    if (!res.ok) throw new Error('Failed to fetch members');
    return await res.json();
  },

  // Get student details by ID
  getStudentById: async (id: string): Promise<Student | null> => {
    const res = await fetch(`${BASE_URL}/members/${id}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error('Failed to fetch student');
    return await res.json();
  },

  // Save student data
  saveStudentData: async (student: Student): Promise<boolean> => {
    const res = await fetch(`${BASE_URL}/members/${student.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    });
    return res.ok;
  }
};

// // Mock data for demonstration
// const mockStudents: Student[] = [
//   {
//     id: '1',
//     name: 'John Smith',
//     totalHours: 120,
//     lastWeekHours: 15,
//     courses: [
//       { id: '1', name: 'JavaScript Fundamentals', totalHours: 40, elapsedHours: 35, progress: 87.5 },
//       { id: '2', name: 'React Development', totalHours: 60, elapsedHours: 25, progress: 41.7 },
//       { id: '3', name: 'Node.js Backend', totalHours: 50, elapsedHours: 8, progress: 16 },
//     ]
//   },
//   {
//     id: '2',
//     name: 'Sarah Johnson',
//     totalHours: 85,
//     lastWeekHours: 12,
//     courses: [
//       { id: '4', name: 'Python Programming', totalHours: 45, elapsedHours: 42, progress: 93.3 },
//       { id: '5', name: 'Data Science', totalHours: 70, elapsedHours: 28, progress: 40 },
//     ]
//   },
//   {
//     id: '3',
//     name: 'Mike Davis',
//     totalHours: 200,
//     lastWeekHours: 25,
//     courses: [
//       { id: '6', name: 'Full Stack Development', totalHours: 120, elapsedHours: 95, progress: 79.2 },
//       { id: '7', name: 'DevOps Fundamentals', totalHours: 40, elapsedHours: 15, progress: 37.5 },
//       { id: '8', name: 'Cloud Computing', totalHours: 80, elapsedHours: 20, progress: 25 },
//     ]
//   }
// ];

// export const api = {
//   // Get all students for dropdown
//   getStudents: async (): Promise<StudentSummary[]> => {
//     await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
//     return mockStudents.map(student => ({ id: student.id, name: student.name }));
//   },

//   // Get student details by ID
//   getStudentById: async (id: string): Promise<Student | null> => {
//     await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
//     const student = mockStudents.find(s => s.id === id);
//     return student || null;
//   },

//   // Save student data
//   saveStudentData: async (student: Student): Promise<boolean> => {
//     await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
//     console.log('Saving student data:', student);
    
//     // Update mock data
//     const index = mockStudents.findIndex(s => s.id === student.id);
//     if (index !== -1) {
//       mockStudents[index] = { ...student };
//       return true;
//     }
//     return false;
//   }
// };