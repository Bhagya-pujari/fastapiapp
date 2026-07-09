import type { Company } from "../types/company";
import type { Job } from "../types/job";
import { useState } from "react";

type Props = {
  companies: Company[];
  jobs: Job[];
  onEdit: (company: Company) => void;
  onDelete: (id: number) => void;
  onAdd: (company: Company) => void;
};

const emptyCompany: Company = {
  id: 0,
  name: "",
  email: "",
  phone: "",
  location: "",
  jobs: []
};

function CompanyCard({ companies, jobs, onAdd, onEdit, onDelete }: Props) {
  const [editCompanyId, setEditCompanyId] = useState<number | null>(null);
  const [addform, setAddform] = useState<Company>(emptyCompany);
  const [editform, setEditform] = useState<Company>(emptyCompany);

  const companyJobCount = (companyId: number) => jobs.filter(job => job.company_id === companyId).length;

  const handleAdd = () => {
    onAdd(addform);
    setAddform(emptyCompany);
  };

  const handleSave = () => {
    onEdit(editform);
    setEditCompanyId(null);
    setEditform(emptyCompany);
  };

  const handleCancel = () => {
    setEditCompanyId(null);
    setEditform(emptyCompany);
  };

  return (
    <section className="resource-section" id="companies">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Company network</p>
          <h2>Companies</h2>
        </div>
        <span>{companies.length} total</span>
      </div>

      <div className="resource-grid">
        {companies.map((company) => {
          const openings = companyJobCount(company.id);
          return (
            <article className="data-card" key={company.id}>
              {editCompanyId === company.id ? (
                <div className="edit-panel">
                  <input type="text" value={editform.name} onChange={(e) => setEditform({ ...editform, name: e.target.value })} placeholder="Company name" />
                  <input type="email" value={editform.email} onChange={(e) => setEditform({ ...editform, email: e.target.value })} placeholder="Email" />
                  <input type="text" value={editform.phone} onChange={(e) => setEditform({ ...editform, phone: e.target.value })} placeholder="Phone" />
                  <input type="text" value={editform.location} onChange={(e) => setEditform({ ...editform, location: e.target.value })} placeholder="Location" />
                  <div className="card-actions">
                    <button className="primary-button compact" type="button" onClick={handleSave}>Save</button>
                    <button className="ghost-button compact" type="button" onClick={handleCancel}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="card-topline">
                    <span className="avatar-chip">{company.name.slice(0, 2).toUpperCase()}</span>
                    <span className="status-pill">{openings} opening{openings === 1 ? "" : "s"}</span>
                  </div>
                  <h3>{company.name}</h3>
                  <dl className="details-list">
                    <div><dt>Email</dt><dd>{company.email}</dd></div>
                    <div><dt>Phone</dt><dd>{company.phone}</dd></div>
                    <div><dt>Location</dt><dd>{company.location}</dd></div>
                  </dl>
                  <div className="card-actions">
                    <button className="ghost-button compact" type="button" onClick={() => {
                      setEditCompanyId(company.id);
                      setEditform({ ...company });
                    }}>Edit</button>
                    <button className="danger-button compact" type="button" onClick={() => onDelete(company.id)}>Delete</button>
                  </div>
                </>
              )}
            </article>
          );
        })}
      </div>

      <form className="add-panel" onSubmit={(e) => { e.preventDefault(); handleAdd(); }}>
        <div>
          <p className="eyebrow">Add company</p>
          <h3>New partner profile</h3>
        </div>
        <div className="form-grid">
          <input type="text" value={addform.name} onChange={(e) => setAddform({ ...addform, name: e.target.value })} placeholder="Company name" required />
          <input type="email" value={addform.email} onChange={(e) => setAddform({ ...addform, email: e.target.value })} placeholder="Email" required />
          <input type="text" value={addform.phone} onChange={(e) => setAddform({ ...addform, phone: e.target.value })} placeholder="Phone" required />
          <input type="text" value={addform.location} onChange={(e) => setAddform({ ...addform, location: e.target.value })} placeholder="Location" required />
        </div>
        <button className="primary-button" type="submit">Add company</button>
      </form>
    </section>
  );
}

export default CompanyCard;
