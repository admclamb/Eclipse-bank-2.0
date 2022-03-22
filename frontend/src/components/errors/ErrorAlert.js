import React from "react";

const ErrorAlert = ({ error }) => {
  return (
    Object.keys(error).length > 0 && (
      <div className="alert alert-danger mt-2 mb-2 w-auto">Error: {error.message}</div>
    )
  );
};

export default ErrorAlert;
