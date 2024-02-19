
export interface EmpResponseType {

    _id: string;
    name: string;
    surname: string;
    age: number;
    email: string;
    img: string;
    experience: number;
    status: string;
}

export interface EmpsResponseType {
    emps: EmpResponseType[];
}

export interface AddEmpRequest {
    
    name: string;
    surname: string;
    age: number;
    email: string;
    img: string;
    experience: number;
    status: string;
    }
