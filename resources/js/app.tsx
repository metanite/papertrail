import { createInertiaApp } from '@inertiajs/react';

import PublicLayout from '@/common/layouts/public-layout';
import AppLayout from '@/common/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const appName = import.meta.env.VITE_APP_NAME || 'Papertrail';

void createInertiaApp({
    title: (title) => (title ? `${title} · ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            case name === 'welcome':
            case name.startsWith('auth/'):
                return PublicLayout;
            case name.startsWith('settings/'):
                return [AppLayout, SettingsLayout];
            default:
                return AppLayout;
        }
    },
    strictMode: true,
    progress: { color: '#1a73e8' },
});
