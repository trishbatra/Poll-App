import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/Components/Nav";
import ContextState from "@/Context/contextState";
import { ToastContainer } from "react-toastify";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pollify: Your Interactive Polling Platform",
  description: "Generated by create next appWelcome to Pollify, the ultimate hub for engaging with polls on a multitude of topics! With Pollify, users can create, discover, and participate in polls on anything from favorite foods to pressing social issues. Seamlessly navigate through a variety of categories or personalize your feed based on your interests. Whether you're curious about global opinions or simply want to settle a debate among friends, Pollify has you covered. Join the community, voice your opinions, and explore the diverse perspectives of users worldwide. With intuitive features and a user-friendly interface, Pollify makes polling both fun and insightful. Download the app now and start shaping the conversation!",
}; 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <script src="../node_modules/flyonui/flyonui.js"></script>
      <head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true"/>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet"/>
      </head>
      <body className="font-tech font-normal text-md">
        
        <ContextState>
         <Nav/>
         <ToastContainer
            position="top-right"
            autoClose={500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
         {children}
        </ContextState>
        </body>
    </html>
  );
}
