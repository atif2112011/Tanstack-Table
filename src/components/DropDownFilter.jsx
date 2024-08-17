import React, { useState } from "react";
import FilterIcon from '../assets/filter.svg';
import checkbox1 from '../assets/checkbox1.svg';
import checkbox2 from '../assets/checkbox2.svg';

const DropdownFilter = ({columnFilters,setColumnFilters}) => {
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [isParentDropdownOpen, setIsParentDropdownOpen] = useState(false);
  const [isRolesOpen, setIsRolesOpen] = useState(false);
  const [isTeamsOpen, setIsTeamsOpen] = useState(false);

  const roles = ["Product Designer", "Product Manager", "Frontend Developer", "Backend Developer"];
  const teams = ["Design", "Product", "Marketing", "Technology"];

  const toggleRoleSelection = (role) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const toggleTeamSelection = (team) => {
    setSelectedTeams((prev) =>
      prev.includes(team) ? prev.filter((t) => t !== team) : [...prev, team]
    );
  };

  const onFilterChange=(id,value)=>{
    setColumnFilters(prev=>prev.filter(f=>f.id!=id))

    for(const i of value)
    {
        setColumnFilters(prev=>prev.concat({
            id:id,value:i
        }))
    }
}



  const handleFilter = () => {
    console.log("Selected Roles:", selectedRoles);
    console.log("Selected Teams:", selectedTeams);
    // Update the filters for roles
    onFilterChange('role', selectedRoles);

    // Update the filters for teams
    // onFilterChange('teams', selectedTeams);
  };

  return (
    <div className="relative inline-block text-left p-2">
      <img 
        src={FilterIcon} 
        onClick={() => setIsParentDropdownOpen(!isParentDropdownOpen)}
        className="h-5 w-5 cursor-pointer"
        alt="Filter Icon"
      />
      {isParentDropdownOpen && (
        <div className="absolute left-0 z-10 mt-2 origin-top-left bg-white border border-gray-300 rounded-md shadow-lg w-[190px]">
          <button
            onClick={() => setIsRolesOpen(!isRolesOpen)}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 gap-2"
          >
            {selectedRoles.length > 0 ? (
              <img src={checkbox2} className="h-4 w-4"/>
            ) : (
                <img src={checkbox1} className="h-4 w-4"/>
            )}
            Roles
          </button>
          {isRolesOpen && (
            <div className="pl-4">
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => toggleRoleSelection(role)}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 gap-1"
                >
                  {selectedRoles.includes(role) ? (
                    <img src={checkbox2} className="h-4 w-4"/>
                  ) : (
                    <img src={checkbox1} className="h-4 w-4"/>
                  )}
                  {role}
                </button>
              ))}
            </div>
          )}
          <button
            onClick={() => setIsTeamsOpen(!isTeamsOpen)}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 gap-2"
          >
            {selectedTeams.length > 0 ? (
              <img src={checkbox2} className="h-4 w-4"/>
            ) : (
                <img src={checkbox1} className="h-4 w-4"/>
            )}
            Teams
          </button>
          {isTeamsOpen && (
            <div className="pl-4">
              {teams.map((team) => (
                <button
                  key={team}
                  onClick={() => toggleTeamSelection(team)}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 gap-1"
                >
                  {selectedTeams.includes(team) ?(
                    <img src={checkbox2} className="h-4 w-4"/>
                  ) : (
                    <img src={checkbox1} className="h-4 w-4"/>
                  )}
                  {team}
                </button>
              ))}
            </div>
          )}
          <button
            onClick={handleFilter}
            className="flex justify-center w-full px-4 py-2 mt-2 text-sm font-medium text-white bg-secondary rounded-md hover:bg-blue-700"
          >
            Select
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownFilter;
