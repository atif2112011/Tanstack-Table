import React, { useState, useEffect } from 'react';
import ProfileModal from '../Modals/ProfileModal';

function DisplayTeams({ getValue, row, column, table }) {
  const [teams, setTeams] = useState(getValue || []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [teamColors, setTeamColors] = useState({
    Design: { bgColor: 'bg-team1bg', textColor: 'text-team1' },
    Product: { bgColor: 'bg-team2bg', textColor: 'text-team2' },
    Marketing: { bgColor: 'bg-team3bg', textColor: 'text-team3' },
    Finance: { bgColor: 'bg-team3bg', textColor: 'text-team3' },
    
  });

  

  const displayedTeams = teams.slice(0, 3); // 
  const extraTeamsCount = teams.length - displayedTeams.length;

  const openModal = () => {
    setIsModalOpen(true);
    console.log('Modal open', isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    console.log('Modal close', isModalOpen);
  };

  useEffect(()=>{
    setTeams(getValue)
  },[getValue])

  return (
    <>
      <ProfileModal
        isOpen={isModalOpen}
        onClose={closeModal}
        row={row}
      />

      <div className="flex gap-1 cursor-pointer" onClick={openModal}>
        {displayedTeams.map((team, index) => {
          const colors = teamColors[team] || { bgColor: 'bg-gray-200', textColor: 'text-gray-600' };
          return (
            <div
              key={index}
              className={`border border-2 rounded-2xl font-medium text-xs p-1 items-center ${colors.bgColor} ${colors.textColor}`}
            >
              {team}
            </div>
          );
        })}

        {extraTeamsCount > 0 && (
          <div className="border border-2 rounded-2xl font-medium text-xs p-1 bg-gray-200 text-gray-600 items-center">
            +{extraTeamsCount}
          </div>
        )}
      </div>
    </>
  );
}

export default DisplayTeams;
