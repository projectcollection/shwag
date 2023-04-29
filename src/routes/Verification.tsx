import { useEffect } from 'react'
import { useVerifyMutation } from '../redux/services/auth';
import { useParams } from 'react-router-dom';


export default function Confirmation() {
    const { verificationCode } = useParams();
    const [verify, { error, data }] = useVerifyMutation();

    useEffect(() => {
        if (verificationCode) {
            verify(verificationCode);
        }
    }, []);

    return (
        <div>
            <div>
                {
                    error &&
                    'data' in error &&
                    (error.data as { status: string, message: string }).message
                }
                {data && data.message}
            </div>
        </div>
    )
}
