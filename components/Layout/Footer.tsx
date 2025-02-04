import { styles } from '@/utils/styles';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <footer className="mt-8 px-5">
            <div className="w-full mb-5 flex flex-col md:flex-row justify-between items-center">
                {/* Logo */}
                <div className="mb-4 md:mb-0">
                    <Link href="/">
                        <h1 className="font-Inter text-3xl cursor-pointer">
                            <span className="text-[#00BFFF]">Prompt</span>Bay
                        </h1>
                    </Link>
                </div>

                {/* Navigation Links */}
                <nav className="flex items-center">
                    <ul className="flex space-x-4">
                        <li>
                            <Link
                                href="/"
                                className={`${styles.label} hover:text-[#00BFFF] transition-colors duration-200`}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/marketPlace"
                                className={`${styles.label} hover:text-[#00BFFF] transition-colors duration-200`}
                            >
                                MarketPlace
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contactus"
                                className={`${styles.label} hover:text-[#00BFFF] transition-colors duration-200`}
                            >
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Footer Text */}
            <p className={`${styles.paragraph} text-center text-sm`}>
                Copyright © {new Date().getFullYear()} PromptBay. All Rights Reserved.
            </p>
            <br/>
            <br/>
        </footer>
    );
};

export default Footer;
