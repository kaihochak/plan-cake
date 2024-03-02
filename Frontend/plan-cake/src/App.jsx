import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import { Home, PickAFilm, CreateEvent, Explore, Profile } from './_root/pages';
import { Toaster } from "@/components/ui/toaster"
import './index.css';

function App() {
  return (
    <main className="flex bg-primary font-Urbanist text-default h-screen">

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
          <Route path="/pickAFilm" element={<PickAFilm />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path='/explore/*' element={<Explore/>} />
          <Route path='/profile/:id/*' element={<Profile/>} />
        </Route>
      </Routes>

      {/* Toaster from Shadcn */}
      <Toaster />
    </main>
  );
}

export default App;
