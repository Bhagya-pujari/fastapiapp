import type { Job } from "../types/job";
import type { Company } from "../types/company";
import { useState } from "react";

type Props = {
  jobs: Job[];
  companies: Company[];
  onEdit: (job: Job) => void;
  onDelete: (id: number) => void;
  onAdd: (job: Job) => void;
};

const emptyJob: Job = {
  id: 0,
  title: "",
  description: "",
  salary: "",
  company_id: 0
};

function JobCard({ jobs, companies, onEdit, onDelete, onAdd }: Props) {
  const [editJobId, setEditJobId] = useState<number | null>(null);
  const [addform, setAddform] = useState<Job>(emptyJob);
  const [editform, setEditform] = useState<Job>(emptyJob);

  const companyName = (companyId: number) => companies.find(company => company.id === companyId)?.name || `Company #${companyId}`;

  const handleAdd = () => {
    onAdd(addform);
    setAddform(emptyJob);
  };

  const handleSave = () => {
    onEdit(editform);
    setEditJobId(null);
    setEditform(emptyJob);
  };

  const handleCancel = () => {
    setEditJobId(null);
    setEditform(emptyJob);
  };

  return (
    <section className="resource-section" id="jobs">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Open roles</p>
          <h2>Jobs</h2>
        </div>
        <span>{jobs.length} total</span>
      </div>

      <div className="resource-grid jobs-grid">
        {jobs.map((job) => (
          <article className="data-card job-card" key={job.id}>
            {editJobId === job.id ? (
              <div className="edit-panel">
                <input type="text" value={editform.title} onChange={(e) => setEditform({ ...editform, title: e.target.value })} placeholder="Job title" />
                <textarea value={editform.description} onChange={(e) => setEditform({ ...editform, description: e.target.value })} placeholder="Description" />
                <input type="text" value={editform.salary} onChange={(e) => setEditform({ ...editform, salary: e.target.value })} placeholder="Salary" />
                <select value={editform.company_id} onChange={(e) => setEditform({ ...editform, company_id: Number(e.target.value) })}>
                  <option value={0}>Select company</option>
                  {companies.map(company => <option key={company.id} value={company.id}>{company.name}</option>)}
                </select>
                <div className="card-actions">
                  <button className="primary-button compact" type="button" onClick={handleSave}>Save</button>
                  <button className="ghost-button compact" type="button" onClick={handleCancel}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div className="card-topline">
                  <span className="status-pill">Active</span>
                  <span className="salary-pill">{job.salary}</span>
                </div>
                <h3>{job.title}</h3>
                <p className="job-company">{companyName(job.company_id)}</p>
                <p className="job-description">{job.description}</p>
                <div className="card-actions">
                  <button className="ghost-button compact" type="button" onClick={() => {
                    setEditJobId(job.id);
                    setEditform({ ...job });
                  }}>Edit</button>
                  <button className="danger-button compact" type="button" onClick={() => onDelete(job.id)}>Delete</button>
                </div>
              </>
            )}
          </article>
        ))}
      </div>

      <form className="add-panel" onSubmit={(e) => { e.preventDefault(); handleAdd(); }}>
        <div>
          <p className="eyebrow">Add role</p>
          <h3>New job listing</h3>
        </div>
        <div className="form-grid job-form-grid">
          <input type="text" value={addform.title} onChange={(e) => setAddform({ ...addform, title: e.target.value })} placeholder="Job title" required />
          <input type="text" value={addform.salary} onChange={(e) => setAddform({ ...addform, salary: e.target.value })} placeholder="Salary" required />
          <select value={addform.company_id} onChange={(e) => setAddform({ ...addform, company_id: Number(e.target.value) })} required>
            <option value={0}>Select company</option>
            {companies.map(company => <option key={company.id} value={company.id}>{company.name}</option>)}
          </select>
          <textarea value={addform.description} onChange={(e) => setAddform({ ...addform, description: e.target.value })} placeholder="Description" required />
        </div>
        <button className="primary-button" type="submit">Add job</button>
      </form>
    </section>
  );
}

export default JobCard;
