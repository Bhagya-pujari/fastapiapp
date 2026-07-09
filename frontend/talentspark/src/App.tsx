import NavBar from "./components/NavBar";
import CompanyCard from "./components/CompanyCard";
import JobCard from "./components/JobCard";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { getCompanies, updateCompany, deleteCompany, createCompany } from "./Services/CompanyService";
import { getJobs, updateJob, deleteJob, createJob } from "./Services/JobService";
import type { Company } from "./types/company";
import type { Job } from "./types/job";
import Login from "./pages/login";
import Register from "./pages/register";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [page, setPage] = useState<"login" | "register">("login");

  const handleLogin = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
      const [companiesData, jobsData] = await Promise.all([getCompanies(), getJobs()]);
      setCompanies(companiesData);
      setJobs(jobsData);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }

  async function handleEdit(company: Company) {
    try {
      const updatedCompany = await updateCompany(company.id, company);
      setCompanies(prev => prev.map(item => item.id === updatedCompany.id ? updatedCompany : item));
    } catch (error) {
      setError(error as Error);
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteCompany(id);
      setCompanies(prev => prev.filter(company => company.id !== id));
    } catch (error) {
      setError(error as Error);
    }
  }

  async function handleAdd(company: Company) {
    try {
      const newCompany = await createCompany(company);
      setCompanies(prev => [...prev, newCompany]);
    } catch (error) {
      setError(error as Error);
    }
  }

  async function handleJobEdit(job: Job) {
    try {
      const updatedJob = await updateJob(job.id, job);
      setJobs(prev => prev.map(item => item.id === updatedJob.id ? updatedJob : item));
    } catch (error) {
      setError(error as Error);
    }
  }

  async function handleJobDelete(id: number) {
    try {
      await deleteJob(id);
      setJobs(prev => prev.filter(job => job.id !== id));
    } catch (error) {
      setError(error as Error);
    }
  }

  async function handleJobAdd(job: Job) {
    try {
      const newJob = await createJob(job);
      setJobs(prev => [...prev, newJob]);
    } catch (error) {
      setError(error as Error);
    }
  }

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  if (!token) {
    return (
      <main className="auth-page">
        <section className="auth-hero" aria-label="TalentSpark overview">
          <div className="brand-mark">TS</div>
          <h1>TalentSpark</h1>
          <p>Manage hiring teams, open roles, and company pipelines from one calm workspace.</p>
          <div className="auth-highlights">
            <span>Company CRM</span>
            <span>Job tracking</span>
            <span>Secure access</span>
          </div>
        </section>
        {page === "login" ? (
          <Login onLogin={handleLogin} onSwitchToRegister={() => setPage("register")} />
        ) : (
          <Register onSwitchToLogin={() => setPage("login")} />
        )}
      </main>
    );
  }

  if (loading) {
    return <div className="screen-state">Loading your TalentSpark workspace...</div>;
  }

  if (error) {
    return (
      <div className="screen-state screen-state-error">
        <strong>Something went wrong</strong>
        <span>{error.message}</span>
        <button
          className="primary-button"
          type="button"
          onClick={() => {
            localStorage.removeItem("token");
            setToken(null);
            setError(null);
            setPage("login");
          }}
        >
          Back to login
        </button>
      </div>
    );
  }

  const filledCompanies = companies.length;
  const filledJobs = jobs.length;
  const activeCompanies = companies.filter(company => jobs.some(job => job.company_id === company.id)).length;

  return (
    <div className="app-shell">
      <NavBar />
      <main className="dashboard">
        <section className="dashboard-hero">
          <div>
            <p className="eyebrow">Hiring command center</p>
            <h1>Welcome back to TalentSpark</h1>
            <p className="hero-copy">Track companies, publish openings, and keep recruiting work organized.</p>
          </div>
          <button className="refresh-button" type="button" onClick={fetchData}>Refresh</button>
        </section>

        <section className="stats-grid" aria-label="Dashboard summary">
          <article className="stat-card">
            <span>Companies</span>
            <strong>{filledCompanies}</strong>
          </article>
          <article className="stat-card">
            <span>Open jobs</span>
            <strong>{filledJobs}</strong>
          </article>
          <article className="stat-card">
            <span>Hiring companies</span>
            <strong>{activeCompanies}</strong>
          </article>
        </section>

        <CompanyCard
          companies={companies}
          jobs={jobs}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={handleAdd}
        />
        <JobCard
          jobs={jobs}
          companies={companies}
          onEdit={handleJobEdit}
          onDelete={handleJobDelete}
          onAdd={handleJobAdd}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;

