'use client';

import { usePathname } from 'next/navigation';
import Nav from './Nav';
import Header from './Header';

interface HomeWrapperProps {
    children: React.ReactNode;
}

const HomeWrapper: React.FC<HomeWrapperProps> = ({ children }) => {
    const pathname = usePathname();
    const isLoginPage = pathname === '/login';
    const isforgotPassword = pathname === '/forgot-password';

    return (
        <>
            {!isLoginPage&& !isforgotPassword  && <Header />}
            <div className={!isLoginPage&&!isforgotPassword  ? 'pt-16' : ''}>
                {children}
            </div>  
            {!isLoginPage && !isforgotPassword && <Nav />}
        </>
    );
};

export default HomeWrapper;