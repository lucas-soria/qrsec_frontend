import { useEffect, useState } from "react";

const ServiceWorkerUpdate = () => {
    const [updateAvailable, setUpdateAvailable] = useState(false);

    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.addEventListener("controllerchange", () => {
                setUpdateAvailable(true);
            });
        }
    }, []);

    const updateServiceWorker = () => {
        if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage("SKIP_WAITING");
            window.location.reload();
        }
    };

    if (!updateAvailable) return null;

    return (
        <button onClick={updateServiceWorker} style={ {
            position: "fixed",
            bottom: "20px",
            right: "20px",
            background: "#2251BF",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            zIndex: 1000,
        } }>
            New Update Available! Click to refresh
        </button>
    );
};

export default ServiceWorkerUpdate;
