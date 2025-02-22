import { Navigate, useParams } from "react-router-dom";

const objectIdRegex = /^[a-fA-F0-9]{24}$/;

export function ValidObjectIdParam({ element } : { element: JSX.Element }) {
    const { id } = useParams<{ id: string }>();

    return id && objectIdRegex.test(id) ? element : <Navigate to="/404" />;
};
