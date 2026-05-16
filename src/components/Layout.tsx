import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ResumeModal from "./ResumeModal";

export default function Layout() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onOpenResume={() => setResumeOpen(true)} activeSection={activeSection} />
      <main className="flex-1">
        <Outlet
          context={{
            onOpenResume: () => setResumeOpen(true),
            onActiveSectionChange: setActiveSection,
          }}
        />
      </main>
      <Footer />
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}