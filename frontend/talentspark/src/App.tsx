import Welcome from "./components/Welcome";
import NavBar from "./components/NavBar";
import CompanyCard from "./components/CompanyCard";
import JobCard from "./components/JobCard";
import Footer from "./components/Footer";
import Login from "./pages/login";
import Register from "./pages/register";
import { useEffect, useState } from "react";
import { getCompanies } from "./Services/CompanyService";
import type { Company } from "./types/company";

function App() {
  const [view, setView] = useState<"login" | "register" | "home">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);

  async function fetchCompanies() {
    setLoading(true);
    try {
      const data = await getCompanies();
      setCompanies(data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (view === "home") {
      fetchCompanies();
    }
  }, [view]);

  const handleLogin = (token: string) => {
    localStorage.setItem("token", token);
    setView("home");
  };

  const handleEdit = (company: Company) => {
    console.log("Edit:", company);
  };

  const handleDelete = (id: number) => {
    console.log("Delete:", id);
  };

  const handleAdd = (company: Company) => {
    console.log("Add:", company);
  };

  if (view === "login") {
    return <Login onLogin={handleLogin} onSwitchToRegister={() => setView("register")} />;
  }

  if (view === "register") {
    return <Register onSwitchToLogin={() => setView("login")} />;
  }

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <NavBar />
      <Welcome />
      <br />

      <CompanyCard
        companies={companies}
        onedit={handleEdit}
        ondelete={handleDelete}
        onadd={handleAdd}
      />

      <JobCard />
      <Footer />
    </>
  );
}

export default App;