import { useEffect } from 'react'
import { useVerifyMutation } from '../redux/services/auth';
import { useParams } from 'react-router-dom';


export default function Confirmation() {
    const { verificationCode } = useParams();
    const [verify, { isLoading, isSuccess, error, data }] = useVerifyMutation();

    useEffect(() => {
        if (verificationCode) {
            verify(verificationCode);
        }
    }, []);

    return (
        <div>
            <div>
                {isLoading ? "verifying" : "verified"}
            </div>
        </div>
    )
}
