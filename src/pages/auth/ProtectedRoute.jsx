import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../../services/firebaseConfig';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setIsAuth(!!user);
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, [])

    if(isLoading) {
        return <div className='text-center mt-10'>Cargando...</div>
    }
    return isAuth ? children : <Navigate to='/login' replace/>;
}

export default ProtectedRoute;
