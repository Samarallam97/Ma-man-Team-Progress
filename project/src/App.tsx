import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MemberDashboard from './components/MemberDashboard';
import { useTeamsData } from './data/mockData';

function App() {
  const [selectedMember, setSelectedMember] = useState(null);
  const { teamsData } = useTeamsData();

  const handleMemberSelect = (member) => {
    setSelectedMember(member);
  };

    
    console.log(teamsData);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        teams={teamsData}
        selectedMember={selectedMember}
        onMemberSelect={handleMemberSelect}
      />
      <MemberDashboard member={selectedMember} />
    </div>
  );
}

export default App;