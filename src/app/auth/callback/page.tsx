// app/auth/callback/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function GoogleCallback() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState('Loading...');

    useEffect(() => {
        // Mendapatkan parameter 'code' dari URL callback
        const code = searchParams.get('code');

        if (code) {
            // Simpan kode otorisasi di localStorage atau state management
            localStorage.setItem('googleAuthCode', code);

            // Log informasi callback (untuk debugging)
            console.log('Auth code received:', code);

            // Menampilkan status berhasil
            setStatus('Berhasil mendapatkan kode otorisasi. Menghubungi server...');

            // Arahkan ke halaman beranda atau dashboard setelah login berhasil
            setTimeout(() => {
                router.push('/success');
            }, 2000);
        } else {
            setStatus('Gagal mendapatkan kode otorisasi');
        }
    }, [searchParams, router]);

    return (
        <div className="container">
            <h1>Google Authentication Callback</h1>
            <p>{status}</p>

            {/* Tampilkan semua parameter URL untuk debugging */}
            <div style={{ marginTop: '20px' }}>
                <h2>Debug Info:</h2>
                <pre>
                    {Array.from(searchParams.entries()).map(([key, value]) => (
                        `${key}: ${value}`
                    )).join('\n')}
                </pre>
            </div>
        </div>
    );
}