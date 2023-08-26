"use client";
import Image from 'next/image'
import styles from './page.module.css'
import './page.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import LandingPage from '@/components/LandingPage';
import LogIn from '@/components/LogIn'
import SearchBook from '@/components/SearchBooks'
import React from 'react';
import { UserProvider } from '@/context/user'; // wrap UserProvider around entire app so it can be accessed in the entire Application
import { BooksProvider } from '@/context/books'; // wrap BooksProvider around entire app so it can be accessed in the entire Application
import { PageProvider } from '@/context/page'; // wrap PageProvider around entire app so it can be accessed in the entire Application
import Borrows from '@/components/Borrows';
import BorrowForm from '@/components/BorrowComponents/BorrowForm';
import BookForm from '@/components/BookComponents/BookForm';
import { UtilisateursProvider } from '@/context/utilisateurs';
import UserForm from '@/components/UserComponents/UserForm';
import UserPage from '@/components/UserComponents/UserPage';
import { BorrowsProvider } from '@/context/borrows';
import { StatutProvider } from '@/context/statut';

export default function Home() {

  return (
    <BrowserRouter>
      <UserProvider>wrap UserProvider around entire app so it can be accessed in the entire Application
        <BooksProvider>
          <PageProvider>
            <BorrowsProvider>
              <UtilisateursProvider>
                <StatutProvider>

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
                        }> </Route>

                        <Route path="/addBooks" element={
                          <BookForm />
                        }> </Route>

                        <Route path="/borrows" element={
                          <Borrows />
                        }> </Route>

                        <Route path="/users" element={
                          <UserPage />
                        }>
                        </Route>
                        <Route path="/addBorrows" element={
                          <BorrowForm />
                        }>
                        </Route>

                        <Route path="/addUser" element={
                          <UserForm />
                        }> </Route>
                      </Routes>
                    </div>



                  </main>
                </StatutProvider>
              </UtilisateursProvider>
            </BorrowsProvider>
          </PageProvider>
        </BooksProvider>
      </UserProvider>
    </BrowserRouter>
  )
}
