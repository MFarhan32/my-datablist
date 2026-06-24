import { useEffect, useState } from 'react';
import { Header } from '../components/Layout/Header';
import { Footer } from '../components/Layout/Footer';
import { authService } from '../services/authService';

const Settings = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    authService.profile().then(setProfile).catch(() => setProfile(null));
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-4xl p-4">
        <h1 className="text-xl font-semibold">Profile</h1>
        {profile ? (
          <div className="mt-4 rounded border bg-white p-4">
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Joined:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
          </div>
        ) : (
          <p className="mt-4 text-slate-600">Unable to load profile.</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Settings;
