import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { Suspense, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth, getUserLoading } from 'entities/User';
import { TokenLocalStorageKey } from 'shared/const/localStorage';
import { PageLoader } from 'widgets/PageLoader';

function App() {
    const dispatch = useDispatch();
    const userLoading = useSelector(getUserLoading);

    useEffect(() => {
        const token = localStorage.getItem(TokenLocalStorageKey);
        if (token) dispatch(checkAuth(token));
    }, [dispatch]);

    return (
        <div className={classNames('app')}>
            <Suspense fallback=''>
                {userLoading ? (
                    <PageLoader />
                ) : (
                    <>
                        <Navbar />
                        <div className='content-page'>
                            <Sidebar />
                            <AppRouter />
                        </div>
                    </>
                )}
            </Suspense>
        </div>
    );
}

export default App;
