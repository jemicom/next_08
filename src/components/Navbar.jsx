"use client";

import { useState } from "react";
import NavLink from "./NavLink";
import styles from './NavLink.module.css'
import { motion } from "framer-motion";

const links = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Todos",
    path: "/todos",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
  {
    title: "Board",
    path: "/board",
  },
];

// 1.
// const Links = () => {
//   const [selectedLink, setSelectedLink] = useState(0);

//   const handleLinkClick = (index) => {
//     setSelectedLink(index);
//   };
//   return (
//     <div >
//       <div>
//         {links.map((link, index) => (
//           <p key={index} onClick={() => handleLinkClick(index)}>
//             <Link href={link.path}>
//               <span style={{ color: selectedLink === index ? 'red' : 'black' }}>
//                 {link.title}
//               </span>
//             </Link>
//           </p>
//         ))}
//       </div> 
//     </div>
//   );
// };

//2 .
// const Links = () => {
//   return (
//     <div >
//       <div  >
//         {links.map((link, index) => (
//           <NavLink item={link} key={link.title} />
//         ))}
//       </div> 
//     </div>
//   );
// };

// const Links = ({ session }) => {
const Links = () => {
  const [open, setOpen] = useState(false);
  // 모바일용 

  // TEMPORARY
  const user = false;
  const session = false;
  const isAdmin = false;

  const topVariants = {
    closed: {
      rotate: 0
    },
    opened: {
      rotate: 45,
      backgroundColor: 'white'
    }
  }
  const centerVariants = {
    closed: {
      opacity: 1
    },
    opened: {
      opacity: 0
    }
  }
  const bottomVariants = {
    closed: {
      rotate: 0
    },
    opened: {
      rotate: -45,
      backgroundColor: 'white'
    }
  }

  const listVariants = {
    closed: {
      x: "100vw"
    },
    opened: {
      x: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  }
  const listItemVariants = {
    closed: {
      x: -10,
      opacity: 0
    },
    opened: {
      x: 0,
      opacity: 1
    }
  }


  return (
    <div className={styles.container}>
      <div className={styles.links}>

        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}

        {
          session ? (
            <>
              {
                isAdmin && (
                  <NavLink item={{ title: "Admin", path: "/admin" }} />
                )
              }<button>logout</button>
            </>
          ) :
            (<NavLink item={{ title: "Login", path: "/login" }} />)
        }

      </div>

      {/* <button onClick={() => setOpen(!open)}
        className={styles.menuButton}
      > 모바일메뉴 </button> */}
      <div className="sm:hidden">
        {/* 이상 화면에서 숨김 */}
        <button onClick={() => setOpen(!open)}
          className="w-10 h-8 flex flex-col justify-between z-50 relative"
        >
          <motion.div variants={topVariants} animate={open ? "opened" : "closed"} className="w-10 h-1 bg-black rounded origin-left"></motion.div>
          <motion.div variants={centerVariants} animate={open ? "opened" : "closed"} className="w-10 h-1 bg-black rounded"></motion.div>
          <motion.div variants={bottomVariants} animate={open ? "opened" : "closed"} className="w-10 h-1 bg-black rounded  origin-left"></motion.div>
        </button>

        {open && (
          <motion.div
            variants={listVariants}
            initial="closed"
            animate="opened"
            // className={styles.mobileLinks}>
            className="absolute top-0 left-0 w-screen min-h-screen h-full  bg-black  text-white  flex flex-col items-center justify-center gap-8 text-4xl">


            {links.map((link) => (
              <motion.div variants={listItemVariants}
                key={link.title}
              >
                <NavLink item={link} key={link.title} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Links;