import React, { useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Compressor from 'compressorjs';
import Reload from '../../assets/reload.svg'
import Trash from '../../assets/trash.svg'
import DefaultPfp from '../../assets/pfp.png'
Modal.setAppElement('#root');

const schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    role: z.string().min(1, "Role is required"),
    status: z.string().min(1, "Status is required"),

});


function AddMemberModal({ isOpen, onClose ,setData}) {
    const [image, setImage] = useState(null);
    const [teams, setTeams] = useState([]);
    const [availableTeams, setAvailableTeams] = useState(['Design', 'Product', 'Marketing','Finance']);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            new Compressor(file, {
                quality: 0.6,
                success(result) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setImage(reader.result);
                    };
                    reader.readAsDataURL(result);
                },
            });
        }
    };

    

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            email: '',
            role: '',
            status: '',
            teams: [], // Ensure this is initialized correctly
        },
    });
   

    const handleAddTeam = (team) => {
        if (team && !teams.includes(team)) {
            setTeams([...teams, team]);
        }
        console.log(teams)
    };

    const handleRemoveTeam = (team) => {
        setTeams(teams.filter(t => t !== team));
    };

    // const handleSubmit = () => {
    //     console.log({ name, email, role, status, teams, image });
    // };
    const handleFormSubmit = (data) => {
        const formData = { ...data, image, teams };
        console.log(formData);
        setData(prevData=>(prevData.concat(formData)))
        onClose();
       
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            ariaHideApp={false}
            style={{
                overlay: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                },
                content: {
                    position: 'relative',
                    top: '15%',
                    left: '25%',
                    right: 'auto',
                    bottom: 'auto',
                    
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    padding: '20px',
                    width: '37%',
                },
            }}
        >
            {/* <div className='flex flex-col gap-4'>
                <div className='text-lg font-bold'>Edit Profile</div>
                <div className='flex flex-col items-center'>
                    <img
                        src={image?image:DefaultPfp}
                        alt="Profile"
                        className='h-[100px] w-[100px] rounded-full object-cover'
                    />
                    <div className='flex gap-2 mt-2'>
                        {!image &&<input type="file" accept="image/*" onChange={handleImageUpload} />}
                        {image && (
                            <>
                                <button className='bg-btn1 text-darkblue px-2 py-2 border border-2 border rounded-sm font-bold flex items-center gap-2 text-xs'>
                                    <img src={Reload} className='h-4 w-4'/>
                                    CHANGE PHOTO</button>
                                <button className='bg-btn1 text-darkblue font-bold px-2 py-2 border border border-2 rounded-sm flex items-center gap-2 text-xs' onClick={() => setImage(null)}>
                                <img src={Trash} className='h-4 w-4'/>
                                    REMOVE PHOTO</button>
                            </>
                        )}
                    </div>
                </div>

                
                <div className='flex gap-4 justify-between'>
                    <div className='flex flex-col flex-1 '>
                    <p className='font-semibold text-base'>Name</p>
                        <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        className='border p-2 rounded text-sm text-gray-600'
                    />
                    </div>
                    
                    <div className='flex flex-col flex-1 '>
                        <p className='font-semibold text-base'>Email</p>
                        <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className='border p-2 rounded text-sm text-gray-600'
                    />
                    </div>
                    
                </div>

                
                <div className='flex gap-4 justify-between'>
                    <div className='flex flex-col flex-1'>
                    <p className='font-semibold text-base'>Role</p>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className='border p-2 rounded w-full text-sm text-gray-600'
                    >
                        <option value="">Select Role</option>
                        <option value="Product Designer">Product Designer</option>
                        <option value="Product Manager">Product Manager</option>
                        <option value="Frontend Developer">Frontend Developer</option>
                        <option value="Backend Developer">Backend Developer</option>
                        <option value="Fullstack Developer">Fullstack Developer</option>x
                        <option value="UX Designer">UX Designer</option>
                        <option value="UX Copywriter">UX Copywriter</option>
                    </select>
                    </div>
                    <div className='flex flex-col flex-1'>
                    <p className='font-semibold text-base '>Status</p>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className='border p-2 rounded w-full text-sm text-gray-600'
                    >
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    </div>
                </div>

                
                <div className='flex flex-col'>
                <p className='font-semibold text-base'>Teams</p>
                    <select
                        onChange={(e) => handleAddTeam(e.target.value)}
                        className='border p-2 rounded mb-2 text-sm text-gray-600'
                    >
                        <option value="">Select Team</option>
                        {availableTeams.map((team, index) => (
                            <option key={index} value={team}>{team}</option>
                        ))}
                    </select>
                    <div className='flex flex-wrap gap-1'>
                        {teams.map((team, index) => (
                            <div key={index} className='flex items-center border border-team1 bg-team1bg rounded px-1 py-0.5 text-team1 text-sm'>
                                <span>{team}</span>
                                <button
                                    className='ml-2 text-team1'
                                    onClick={() => handleRemoveTeam(team)}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

            
                <div className='flex gap-4 justify-end'>
                    <button
                        className='bg-btn1 text-darkblue px-2 py-2 border border border-2
                        text-xs rounded-sm font-bold flex items-center gap-2 '
                        onClick={onClose}
                    >
                        CANCEL
                    </button>
                    <button
                        className='text-xs bg-btn1 text-darkblue px-2 py-2 border border border-2 rounded-sm font-bold flex items-center gap-2'
                        onClick={handleSubmit}
                    >
                        SAVE
                    </button>
                </div>
            </div> */}
              <form onSubmit={handleSubmit(handleFormSubmit)} className='flex flex-col gap-4'>
                <div className='text-lg font-bold'>Add Member</div>
                
                <div className='flex flex-col items-center'>
                    <img
                        src={image || DefaultPfp}
                        alt="Profile"
                        className='h-[100px] w-[100px] rounded-full object-cover'
                    />
                    <div className='flex gap-2 mt-2'>
                        {!image && <input type="file" accept="image/*" onChange={handleImageUpload} />}
                        {/* {image && (
                            <>
                                <button
                                    type="button"
                                    className='bg-btn1 text-darkblue px-2 py-2 border border-2 rounded-sm font-bold flex items-center gap-2 text-xs'
                                    onClick={() => setImage(null)}
                                >
                                    <img src={Trash} className='h-4 w-4' alt="Remove"/>
                                    REMOVE PHOTO
                                </button>
                            </>
                        )} */}
                        {image && (
                            <>
                                <button className='bg-btn1 text-darkblue px-2 py-2 border border-2 border rounded-sm font-bold flex items-center gap-2 text-xs' disabled>
                                    <img src={Reload} className='h-4 w-4'/>
                                    CHANGE PHOTO</button>
                                <button className='bg-btn1 text-darkblue font-bold px-2 py-2 border border border-2 rounded-sm flex items-center gap-2 text-xs' onClick={() => setImage(null)}>
                                <img src={Trash} className='h-4 w-4'/>
                                    REMOVE PHOTO</button>
                            </>
                        )}
                    </div>
                </div>
                
                <div className='flex gap-4 justify-between'>
                    <div className='flex flex-col flex-1'>
                        <p className='font-semibold text-base'>Name</p>
                        <input
                            {...register('name')}
                            type="text"
                            placeholder="Name"
                            className={`border p-2 rounded text-sm text-gray-600 ${errors.name ? 'border-red-500' : ''}`}
                        />
                        {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                    </div>
                    
                    <div className='flex flex-col flex-1'>
                        <p className='font-semibold text-base'>Email</p>
                        <input
                            {...register('email')}
                            type="email"
                            placeholder="Email"
                            className={`border p-2 rounded text-sm text-gray-600 ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                    </div>
                </div>
                
                <div className='flex gap-4 justify-between'>
                    <div className='flex flex-col flex-1'>
                        <p className='font-semibold text-base'>Role</p>
                        <select
                            {...register('role')}
                            className={`border p-2 rounded w-full text-sm text-gray-600 ${errors.role ? 'border-red-500' : ''}`}
                        >
                            <option value="">Select Role</option>
                            <option value="Product Designer">Product Designer</option>
                            <option value="Product Manager">Product Manager</option>
                            <option value="Frontend Developer">Frontend Developer</option>
                            <option value="Backend Developer">Backend Developer</option>
                            <option value="Fullstack Developer">Fullstack Developer</option>
                            <option value="UX Designer">UX Designer</option>
                            <option value="UX Copywriter">UX Copywriter</option>
                        </select>
                        {errors.role && <span className="text-red-500 text-xs">{errors.role.message}</span>}
                    </div>
                    
                    <div className='flex flex-col flex-1'>
                        <p className='font-semibold text-base'>Status</p>
                        <select
                            {...register('status')}
                            className={`border p-2 rounded w-full text-sm text-gray-600 ${errors.status ? 'border-red-500' : ''}`}
                        >
                            <option value="">Select Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        {errors.status && <span className="text-red-500 text-xs">{errors.status.message}</span>}
                    </div>
                </div>
                
                <div className='flex flex-col'>
                    <p className='font-semibold text-base'>Teams</p>
                    <select
                        onChange={(e) => handleAddTeam(e.target.value)}
                        className='border p-2 rounded mb-2 text-sm text-gray-600'
                    >
                        <option value="">Select Team</option>
                        {availableTeams.map((team, index) => (
                            <option key={index} value={team}>{team}</option>
                        ))}
                    </select>
                    <div className='flex flex-wrap gap-1'>
                        {teams.map((team, index) => (
                            <div key={index} className='flex items-center border border-team1 bg-team1bg rounded px-1 py-0.5 text-team1 text-sm'>
                                <span>{team}</span>
                                <button
                                    type="button"
                                    className='ml-2 text-team1'
                                    onClick={() => handleRemoveTeam(team)}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                    {errors.teams && <span className="text-red-500 text-xs">{errors.teams.message}</span>}
                </div>
                
                <div className='flex gap-4 justify-end'>
                    <button
                        type="button"
                        className='bg-btn1 text-darkblue px-2 py-2 border border-2 text-xs rounded-sm font-bold flex items-center gap-2'
                        onClick={onClose}
                    >
                        CANCEL
                    </button>
                    <button
                        type="submit"
                        className='text-xs bg-btn1 text-darkblue px-2 py-2 border border-2 rounded-sm font-bold flex items-center gap-2'
                    >
                        ADD
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default AddMemberModal;
