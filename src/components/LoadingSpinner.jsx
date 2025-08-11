import React from "react";

export const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-500"></div>
        </div>
    );
};
