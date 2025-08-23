import { useEffect, useState } from 'react';
import { TEAMS, GOAL_STATUS, Team } from '../types/index';

export function useTeamsData() {
  const [teamsData, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    fetch('https://dashboard-maman.runasp.net/api/teams')
      .then((res) => res.json())
      .then((data) => {
        const mappedData = data.map((team: Team) => ({
          ...team,
          name: setTeamName(team.name),
          members: team.members.map(member => ({
            ...member,
            goalStatus: calculateGoalStatus(member.lastWeekHours , member.goalStatus),
          }))
        }));
        setTeams(mappedData);
      })
      .catch((err) => {
        console.error('Error fetching teams:', err);
      });
  }, []);

  return { teamsData };
}

function calculateGoalStatus(hours: number , goalStatus : string) {
  if(goalStatus == "break") return GOAL_STATUS.BREAK;
  if (hours < 15) return GOAL_STATUS.NOT_ACHIEVED;
  if (hours < 25) return GOAL_STATUS.IN_PROGRESS;
  return GOAL_STATUS.ACHIEVED;
}

function setTeamName(team: string) {
  if (team == "AI") return TEAMS.AI;
  if (team == "Front") return TEAMS.FRONT;
  if (team == "Back") return TEAMS.BACK;
  return TEAMS.SECURITY;
}

