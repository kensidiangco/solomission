'use client';

import { usePathname } from 'next/navigation';
import Tab from './tab';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const showTab = pathname !== '/';

return (
    <div className="">
        {showTab && <Tab />}
        {children}
    </div>
);
}