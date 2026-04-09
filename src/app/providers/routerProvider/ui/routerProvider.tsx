import {Routes, Route} from "react-router-dom";
import {Home} from "pages/home";
import {Error} from "pages/error";
import {Auth} from "pages/auth";
import {Register} from "pages/register";
import {Agreement} from "pages/agreement";
import {Policy} from "pages/policy";
import {Contacts} from "pages/contacts";
import {Rules} from "pages/rules";
import {Profile} from "pages/profile";
import {Gallery} from "pages/gallery";
import {Chats} from "pages/chats";
import {Notifications} from "pages/notifications";
import {Communities} from "pages/communities";
import {ForgotPassword} from "pages/forgotPassword";
import {Post} from "pages/post";
import {Album} from "pages/album";
import {Chat} from "pages/chat";
import {Settings} from "pages/settings";
import {CreatePost} from "pages/createPost";
import {CreateAlbum} from "pages/createAlbum";

export const RouterProvider = () => {
	return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/profile/:ulid" element={<Profile />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/post/:ulid" element={<Post />} />
            <Route path="/post/:ulid/edit" element={<CreatePost />} />
            <Route path="/album/add" element={<CreatePost />} />
            <Route path="/album/:ulid" element={<Album />} />
            <Route path="/album/:ulid/edit" element={<CreateAlbum />} />
            <Route path="/album/add" element={<CreateAlbum />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/chats/:ulid" element={<Chat />} />
            <Route path="/communities" element={<Communities />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/agreement" element={<Agreement />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="*" element={<Error />} />
        </Routes>
	)
}
