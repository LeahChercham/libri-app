"use client";
import Image from 'next/image'
import styles from './page.module.css'
import './page.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import LandingPage from '@/components/LandingPage';
import LogIn from '@/components/LogIn'
import SearchBook from '@/components/SearchBook'
import React, { useEffect, useState } from 'react';

export default function Home() {

  const [state, setState] = useState({})

  return (
    <BrowserRouter>
      <main className={styles.main}>

        <NavBar />
        <div className={styles.page}>
          <Routes>
            <Route path="/" element={
              <LandingPage />
            }> </Route>


            <Route path="/search" element={
              <SearchBook />
            }>
            </Route>

            <Route path="/login" element={
              <LogIn />
            }>
            </Route>

          </Routes>
        </div>



      </main>
    </BrowserRouter>
  )
}
