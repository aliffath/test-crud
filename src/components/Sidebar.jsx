import React, { useState } from "react";
import Link from "next/link";
import { BsArrowLeftCircle } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FiMenu, FiX } from "react-icons/fi";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <>
      <div
        className={`${
          open ? "w-60" : "w-fit"
        } hidden sm:block relative h-screen duration-300 bg-slate-800 border-r border-gray-200 dark:border-gray-600 p-5 dark:bg-slate-800`}
      >
        <BsArrowLeftCircle
          className={`${
            !open && "rotate-180"
          } absolute text-3xl bg-white fill-slate-800 rounded-full cursor-pointer top-9 -right-4 dark:fill-gray-400 dark:bg-gray-800`}
          onClick={() => setOpen(!open)}
        />
        <Link href="/">
          <div className={`flex ${open && "gap-x-4"} items-center`}>
            {open && (
              <span className="text-xl font-medium whitespace-nowrap text-white">
                Tonjoo Test
              </span>
            )}
          </div>
        </Link>

        <ul className="pt-6">
          <Link href="/">
            <li
              className="flex items-center gap-x-6 p-3 text-base font-normal rounded-lg cursor-pointer dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700
                       
                  bg-gray-200 dark:bg-gray-700"
            >
              <span className="text-2xl">
                <CgProfile />
              </span>
              <span
                className={`${
                  !open && "hidden"
                } origin-left duration-300 hover:block`}
              >
                All Users
              </span>
            </li>
          </Link>
        </ul>
      </div>
      {/* Mobile Menu */}
      <div className="pt-3 sm:hidden">
        {mobileMenu ? (
          <FiX
            className="text-3xl cursor-pointer dark:text-white"
            onClick={() => setMobileMenu(false)}
          />
        ) : (
          <FiMenu
            className="text-3xl cursor-pointer dark:text-white"
            onClick={() => setMobileMenu(true)}
          />
        )}
      </div>
      <div className="sm:hidden">
        <div
          className={`${
            mobileMenu ? "flex" : "hidden"
          } absolute z-50 flex-col items-center self-end py-8 mt-16 space-y-6 font-bold sm:w-auto left-6 right-6 dark:text-white  bg-gray-50 dark:bg-slate-800 drop-shadow md rounded-xl`}
        >
          <Link href="/" onClick={() => setMobileMenu(false)}>
            <span
              className="
                  bg-gray-200 dark:bg-gray-700
                p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 font-bold"
            >
              All Users
            </span>
          </Link>
          <Link href="/add-user" onClick={() => setMobileMenu(false)}>
            <span
              className="
                  bg-gray-200 dark:bg-gray-700
                p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Add User
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
