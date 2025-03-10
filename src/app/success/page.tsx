// app/dashboard/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Success() {
    const router = useRouter();
    const [authCode, setAuthCode] = useState('');

    useEffect(() => {
        // Periksa apakah ada kode otorisasi dari Google
        const code = localStorage.getItem('googleAuthCode');

        if (!code) {
            // Jika tidak ada kode otorisasi, arahkan kembali ke halaman login
            router.push('/login');
        } else {
            setAuthCode(code);
        }
    }, [router]);

    return (
        <div className="container">
            <h1>Dashboard</h1>
            <p>Selamat datang! Anda telah berhasil login dengan Google.</p>

            <div style={{ marginTop: '20px' }}>
                <h2>Informasi Auth:</h2>
                <p>Auth Code: {authCode.substring(0, 15)}...</p>
            </div>

            <button
                onClick={() => {
                    localStorage.removeItem('googleAuthCode');
                    router.push('/login');
                }}
                style={{ marginTop: '20px' }}
            >
                Logout
            </button>
        </div>
    );
}