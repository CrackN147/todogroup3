import { useState } from "react";
import { Footer, Header, Sidebar, WorkFlow } from "components";

export const App = () => {
  return (
    <div className="container">
      <Header />
      <main>
        <WorkFlow />
        <Sidebar />
      </main>
      <Footer />
    </div>
  );
}