import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ROUTES from './routes'
import PostsPage from '../posts/pages/PostsPage'
import AboutPage from '../pages/AboutPage'
import MyPosts from '../posts/pages/MyPosts'
import ErrorPage from '../pages/ErrorPage'
import LoginPage from '../users/pages/LoginPage'
import MyFavoritePosts from '../posts/pages/MyFavoritePosts'
import SignupForm from '../forms/pages/SignupForm'
import ProfilePage from '../pages/ProfilePage'
import ChatsViewPage from '../pages/ChatsViewPage'
import StartChat from '../sockets/StartChat'
import UploudPostForm from '../forms/pages/UploudPostForm'
import ProfileSettings from '../users/components/ProfileSettings'
import CommentsOfEachPost from '../posts/components/CommentsOfEachPost'


export default function Router() {
    return (
        <>
            <Routes>
                <Route path={ROUTES.ROOT} element={<LoginPage />} />
                <Route path={ROUTES.POSTS} element={<PostsPage />} />
                <Route path={ROUTES.ABOUT} element={<AboutPage />} />
                <Route path={ROUTES.CRM_ADMIN} element={<CrmAdminPagE />} />
                <Route path={ROUTES.FAVORITES} element={<MyFavoritePosts />} />
                <Route path={ROUTES.MY_POSTS} element={<MyPosts />} />
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                <Route path={ROUTES.SIGNUP} element={<SignupForm />} />
                <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
                <Route path={ROUTES.POST_COMMENTS} element={<CommentsOfEachPost />} />
                <Route path={ROUTES.CHATS} element={<ChatsViewPage />} />
                <Route path={ROUTES.START_CHAT} element={<StartChat />} />
                <Route path={ROUTES.UPLOUD_PAGE} element={<UploudPostForm />} />
                <Route path={ROUTES.PROFILE_SETTINGS} element={<ProfileSettings />} />

                <Route path='/*' element={<ErrorPage />} />
            </Routes>
        </>
    )
}
