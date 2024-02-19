import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useEmpsContext } from '../../lib/context/EmployeeContext/EmpContext';
import { AddEmpRequest } from '../../api/Employees/employee.types';
import { createEmp, editEmp, getEmpById } from '../../api/Employees/employee.client';
import FormMessage from './FormMessage';

export interface FormDataType {
    name: string;
    surname: string;
    age: number;
    email: string;
    experience: number;
    status: string
}

export interface ErrorFormDataType {
    name?: string;
    surname?: string;
    age?: number;
    email?: string;
    img?: string;
    experience?: number;
    status?: string;
}

const EmployeeForm = () => {
    const { empId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<AddEmpRequest>({
        name: "",
        surname: "",
        age: 0,
        email: "",
        experience: 0,
        status: "",
        img: ""
    })

    const [errors, setErrors] = useState<{ [key: string]: string }>();

    const { addNewEmp, updateEmp } = useEmpsContext()
    useEffect(() => {
        if (empId) {
            console.log('fetching');

            getEmpById(empId).then(response => {
                console.log({ response });
                const { emp } = response.data

                setFormData(emp);
            })
        }
    }, [])


    const handleStringInput = (event: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        setFormData((previousState: AddEmpRequest) => ({
            ...previousState,
            [name]: value
        }))
    }

    const handleNumberInput = (event: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        setFormData((previousState: AddEmpRequest) => ({
            ...previousState,
            [name]: Number(value)
        }))
    }

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.currentTarget;
        setFormData((previousState: AddEmpRequest) => ({
            ...previousState,
            [name]: String(value)
        }))
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (empId) {
            editEmp(empId, formData).then(
                res => {
                    setErrors({})
                    setFormData({
                        name: "",
                        surname: "",
                        age: 0,
                        email: "",
                        experience: 0,
                        status: "",
                        img: ""
                    })
                    updateEmp(empId, res.data.emp)
                    navigate('/')
                }
            ).catch(err => setErrors(err?.response.data.errors))
        } else {
            createEmp(formData).then((response) => {
                setErrors({})
                setFormData({
                    name: "",
                    surname: "",
                    age: 0,
                    email: "",
                    experience: 0,
                    status: "",
                    img: ""
                })
                addNewEmp(response?.data?.emp)
                navigate('/')
            }).catch(err => {
                console.log({ err })
                setErrors(err?.response.data.errors)
            })
        }
    }

    return (
        <form onSubmit={handleSubmit} className='ui form mb-6'>
            <div className='field mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>Employee Name</label>
                <input onChange={handleStringInput} value={formData.name} type='text' name="name" id="name" placeholder='Employee Name' className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                <FormMessage error={errors?.name} />
            </div>
            <div className='field mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>Employee Surname</label>
                <input onChange={handleStringInput} value={formData.surname} type='text' name="surname" id="surname" placeholder='Employee surname' className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                <FormMessage error={errors?.surname} />
            </div>
            <div className='field mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>Employee Age</label>
                <input onChange={handleNumberInput} value={formData.age} type='number' name="age" id="age" placeholder='Employee Age' className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                <FormMessage error={errors?.age} />
            </div>
            <div className='field mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>Employee Email</label>
                <input onChange={handleStringInput} value={formData.email} type='email' name="email" id="email" placeholder='Employee Email' className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                <FormMessage error={errors?.email} />
            </div>
            <div className='field mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>Employee Image</label>
                <input onChange={handleStringInput} value={formData.img} type='text' name="img" id="img" placeholder='Employee Image URL' className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                <FormMessage error={errors?.img} />
            </div>
            <div className='field mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>Employee Experience</label>
                <input onChange={handleNumberInput} value={formData.experience} type='number' name="experience" id="experience" placeholder='Employee Experience' className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                <FormMessage error={errors?.experience} />
            </div>
            <div className='field mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>Employee Status</label>
                <select onChange={handleStatusChange} value={formData.status} name="status" id="status" className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                    <option value="select">Select</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
            <button className='bg-blue-500 hover:bg-slate-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>
                {empId ? 'Update' : 'Save'}
            </button>
        </form>
    );

}

export default EmployeeForm