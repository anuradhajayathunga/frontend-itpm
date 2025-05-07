import React from "react";
import AdminUserTable from "./AdminUserTable";

const Users = () => {
  return (
    <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
      <AdminUserTable />
      <AdminUserTable />
    </div>
  );
};

export default Users;
