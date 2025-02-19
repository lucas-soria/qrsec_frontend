import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

export function FloatingAddButton () {
    const navigate = useNavigate();

    return (
        <Fab
            sx={{
                position: "fixed",
                bottom: 16,
                right: 16,
                backgroundColor: "var(--qrsec-light-blue)",
                color: "var(--qrsec-white)",
                "&:hover": { backgroundColor: "var(--qrsec-dark-blue)" } // Darker shade on hover
            }}
            onClick={() => navigate("./create")}
        >
            <AddIcon />
        </Fab>
    );
};
