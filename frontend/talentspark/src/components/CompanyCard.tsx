import type { Company } from "../types/company";
import { useState } from "react";

type Props = {
    companies:Company[];
    onedit: (company:Company)=>void;
    ondelete: (id:number)=>void;
    onadd: (company:Company)=>void;
}


function CompanyCard({
    companies,onadd,onedit,ondelete}:Props){
    const [editCompanyId, setEditCompanyId] = useState<number | null>(null);
    const [addform,setAddform] = useState<Company>({
        id:0,
        name:"",
        email:"",
        phone:"",
        location:"",
        jobs:[]
    });
    const [editform,setEditform] = useState<Company>({
        id:0,
        name:"",
        email:"",
        phone:"",
        location:"",
        jobs:[]
    });
    const handleAdd = () => {
        onadd(addform);
        setAddform({
            id:0,
            name:"",
            email:"",
            phone:"",
            location:"",
            jobs:[]
        })
    }
    const handleEdit = (company:Company) => {
        setEditCompanyId(company.id);
        setEditform({
            id:company.id,
            name:company.name,
            email:company.email,
            phone:company.phone,
            location:company.location,
            jobs:company.jobs
        })
    }
    const handleDelete = (id:number) => {
        ondelete(id);
    }
    const handleSave = () => {
        onedit(editform);
        setEditform({
            id:0,
            name:"",
            email:"",
            phone:"",
            location:"",
            jobs:[]
        })
    } 
    const handlecancel = () => {
        setEditCompanyId(null);
        setEditform({
            id:0,
            name:"",
            email:"",
            phone:"",
            location:"",
            jobs:[]
        })
    } 

    return(
        <div>
            {companies.map((company) => (
                <div key={company.id}>
                    {editCompanyId === company.id ? (
                        <>
                    <label htmlFor={`edit-name-${company.id}`}>Name</label>
                    <input id={`edit-name-${company.id}`} type="text" value={editform.name} onChange={(e)=>setEditform({...editform,name:e.target.value})} />
                    <label htmlFor={`edit-email-${company.id}`}>Email</label>
                    <input id={`edit-email-${company.id}`} type="text" value={editform.email} onChange={(e)=>setEditform({...editform,email:e.target.value})} />
                    <label htmlFor={`edit-phone-${company.id}`}>Phone</label>
                    <input id={`edit-phone-${company.id}`} type="text" value={editform.phone} onChange={(e)=>setEditform({...editform,phone:e.target.value})} />
                    <label htmlFor={`edit-location-${company.id}`}>Location</label>
                    <input id={`edit-location-${company.id}`} type="text" value={editform.location} onChange={(e)=>setEditform({...editform,location:e.target.value})} />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handlecancel}>Cancel</button>
                    </>
                    ):
                    <>
                    <h1>{company.name}</h1>
                    <p>Email: {company.email}</p>
                    <p>Phone: {company.phone}</p>
                    <p>Location: {company.location}</p>
                    </>}
                    <button onClick={() => handleEdit(company)}>Edit</button>
                    <button onClick={() => handleDelete(company.id)}>Delete</button>
                    <hr></hr>
                </div>
            ))}
            <h2>Add Company</h2>
            <label htmlFor="add-name">Name</label>
            <input id="add-name" type="text" value={addform.name} onChange={(e)=>setAddform({...addform,name:e.target.value})} />
            <label htmlFor="add-email">Email</label>
            <input id="add-email" type="text" value={addform.email} onChange={(e)=>setAddform({...addform,email:e.target.value})} />
            <label htmlFor="add-phone">Phone</label>
            <input id="add-phone" type="text" value={addform.phone} onChange={(e)=>setAddform({...addform,phone:e.target.value})} />
            <label htmlFor="add-location">Location</label>
            <input id="add-location" type="text" value={addform.location} onChange={(e)=>setAddform({...addform,location:e.target.value})} />
            <button onClick={handleAdd}>Add</button>
        </div>
    )
}

export default CompanyCard