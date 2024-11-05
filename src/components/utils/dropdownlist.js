import React from "react";

export const DDL_BRANCH_OPTIONS = (branches, level = "Primary") => {
  if (branches === null) return null;
  return Object.keys(branches).map(key => {
    const branch = branches[key];
    const active = Boolean(branch.Active);
    const primary = branch.primary;
    const secondary = branch.secondary;
    if (active) {
      if (level === "Primary" && primary) {
        return (
          <option key={branch.Branch_Name} defaultValue={branch.Branch_Name}>
            {branch.Branch_Name}
          </option>
        );
      }
      if (level === "Secondary" && secondary) {
        return (
          <option key={branch.Branch_Name} defaultValue={branch.Branch_Name}>
            {branch.Branch_Name}
          </option>
        );
      }
    }
  });
};
