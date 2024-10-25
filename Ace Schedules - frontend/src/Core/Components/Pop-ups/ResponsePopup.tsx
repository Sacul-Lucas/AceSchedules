import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

interface ResponsePopupProps {
    type: 'success' | 'error';
    redirectLink: string;
    title: string;
    description: string;
}

export let handleAlert = async () => {};

const MySwal = withReactContent(Swal);

export const ResponsePopup: React.FC<ResponsePopupProps> = ({ type, redirectLink, title, description }) => {
    const navigate = useNavigate();

    handleAlert = async () => {
        if (type === 'success') {
            await MySwal.fire({
                icon: 'success',
                title: title,
                text: description,
            });
        } else if (type === 'error') {
            await MySwal.fire({
                icon: 'error',
                title: title,
                text: description,
            });
        }
        navigate(redirectLink);
    };
    return null;
}