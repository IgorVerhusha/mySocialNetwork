import React from "react";


let Preloader: React.FC = () => {
    return <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
    </div>
}

export default Preloader;