import React, { useState } from 'react';
import { Route, Routes, BrowserRouter, ScrollRestoration } from 'react-router-dom';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import LandingLayout from './_landing/LandingLayout';
import Landing from './_landing/pages/Landing';
import { Home, PickAFilm, CreateEvent, Explore, Profile, FilmPage, EventPage, PickAFilmPage } from './_root/pages';
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/utility/theme-provider";
import './index.css';
import ScrollToTop from './components/utility/ScrollToTop';
// import '@mantine/core/styles.css';

// import { MantineProvider } from '@mantine/core';

function App() {
  return (
    // <MantineProvider
    //   styles={{
    //     '@global': {
    //       ':root': {
    //         '--mantine-color-body': '#496078', // Your desired background color
    //         '--mantine-color-text': '#496078', // Your desired text color
    //       }
    //     }
    //   }}
    // >
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

      <main className="flex h-screen bg-primary font-Urbanist text-default">
        <ScrollToTop />

        {/* Routes */}
        <Routes>
          {/* auth */}
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SigninForm />} />
            <Route path="/sign-up" element={<SignupForm />} />
          </Route>

          {/* public */}
          <Route element={<RootLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/pickAFilm" element={<PickAFilm />} />
            <Route path="/pickAFilm/:id" element={<PickAFilmPage />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path='/explore/*' element={<Explore />} />
            <Route path='/profile/:id/*' element={<Profile />} />
            <Route path='/film/:id' element={<FilmPage />} />
            <Route path='/event/:id' element={<EventPage />} />
          </Route>

          {/* landing */}
          <Route element={<LandingLayout />}>
            <Route index element={<Landing />} />
          </Route>
        </Routes>

        {/* Toaster from Shadcn */}
        <Toaster />
      </main>
    </ThemeProvider>
    // </MantineProvider>
  );
}

export default App;
