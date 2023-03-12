import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { Suspense, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { checkAuth, getUserLoading } from 'entities/User';
import { PageLoader } from 'widgets/PageLoader';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';

function App() {
    const dispatch = useAppDispatch();
    const userLoading = useSelector(getUserLoading);

    useEffect(() => {
        dispatch(checkAuth());
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
