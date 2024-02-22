import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateEvent from './_root/pages/CreateEvent'; // Import CreateEvent component
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import { Home } from './_root/pages';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import { Toaster } from "@/components/ui/toaster"

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <main className="bg-primary px-6 py-8 font-Urbanist text-default">


      {/* Routes */}
      <Routes>

        {/* public */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* private */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/create-event" element={<CreateEvent />} />
        </Route>

      </Routes>

      <Toaster />
    </main>
  );
}

export default App;
