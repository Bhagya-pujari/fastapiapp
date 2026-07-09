function NavBar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <a className="navbar-brand" href="#top" aria-label="TalentSpark home">
        <span className="navbar-logo">TS</span>
        <span>TalentSpark</span>
      </a>
      <div className="navbar-links">
        <a href="#companies">Companies</a>
        <a href="#jobs">Jobs</a>
        <button type="button" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default NavBar;
