import { useNavigate } from "react-router-dom"
import { FaFilePdf } from "react-icons/fa";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="d-flex flex-wrap h-100 text-center pt-5 bg-primary">
            <div className="col text-center pt-3" onClick={() => navigate("/merge")}>
                <div className="btn col-2 border bg-light shadow">
                    <FaFilePdf size={150} />
                    <div className="m-4 fs-4">Merge PDF</div>
                </div>
            </div>
        </div>
    )
}