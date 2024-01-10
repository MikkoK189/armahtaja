import { useRouter } from 'next/router';
import { useUser } from '../../contexts/UserContext';
import { useEffect } from 'react';

const AdminPage = () => {
    const router = useRouter();
    const { admin } = useUser();

    useEffect(() => {
        if (!admin) {
            router.push('/');
        }
    
      }, [admin, router]);

    // Render your admin panel content here

    return (
        <div>
            admin
        </div>
    );
};

export default AdminPage;
