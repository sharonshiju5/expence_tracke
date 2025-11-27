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

    return (
        <>
            {!isLoginPage && <Header />}
            <div className={!isLoginPage ? 'pt-16' : ''}>
                {children}
            </div>
            {!isLoginPage && <Nav />}
        </>
    );
};

export default HomeWrapper;