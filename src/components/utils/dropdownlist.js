import React from "react";

export const DDL_BRANCH_OPTIONS = branches => {

    if(branches === null ) return null;
  return (
    // eslint-disable-next-line
    Object.keys(branches).map(key => {
      const branch = branches[key];
      const active = Boolean(branch.Active);
      if (active) {
        return (
          <option key={branch.Branch_Name} defaultValue={branch.Branch_Name}>
            {branch.Branch_Name}
          </option>
        );
      }
    })
  );
};
