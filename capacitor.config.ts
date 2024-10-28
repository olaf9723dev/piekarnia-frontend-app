import {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'pl.notbug.piekarnia',
    appName: 'Mobilna piekarnia',
    webDir: 'build',
    bundledWebRuntime: false,
    server: {
        cleartext: true
    },
    plugins: {
        GoogleAuth: {
            scopes: [
                'profile',
                'email'
            ],
            serverClientId: '884445109096-3nqlk7757dug4h8m6o1ofcmbj4aj4u5e.apps.googleusercontent.com',
            forceCodeForRefreshToken: true
        }

    }
};

export default config;
