
import { useNavigate } from "react-router-dom";

const EditIcon = ({ title, description, image, blogId }) => {

    const navigate = useNavigate();

    const handleEdit = async () => {
        try {
            navigate("/create-blog", { state: { title, description, image, blogId } });
        } catch (error) {
            console.log(error);
            alert(error.response.data.message)
        }
    }
    return <>
        <img onClick={handleEdit} src="https://cdn-icons-png.flaticon.com/512/61/61456.png" alt="edit-button" width={20} height={20} style={{ cursor: "pointer" }} />
    </>
}

export default EditIcon;