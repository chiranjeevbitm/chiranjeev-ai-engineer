import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import ResumeModal from "./ResumeModal";
import SceneLayer from "./SceneLayer";
import CursorGlow from "./CursorGlow";
import { useMode } from "../context/ModeContext";

export default function Layout() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { is3D } = useMode();

  return (
    <>
      {is3D && (
        <>
          <SceneLayer />
          <CursorGlow />
        </>
      )}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar onOpenResume={() => setResumeOpen(true)} activeSection={activeSection} />
        <main className="flex-1">
          <Outlet
            context={{
              onOpenResume: () => setResumeOpen(true),
              onActiveSectionChange: setActiveSection,
            }}
          />
        </main>
        <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      </div>
    </>
  );
}
