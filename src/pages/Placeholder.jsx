import React from "react";

const Placeholder = ({ moduleNumber }) => (
  <div className="min-h-screen flex flex-col items-center justify-center">
    <h1 className="text-3xl font-bold mb-4">Module {moduleNumber} Coming Soon</h1>
    <p className="text-lg text-muted-foreground">This module is not yet implemented.</p>
  </div>
);

export default Placeholder;
