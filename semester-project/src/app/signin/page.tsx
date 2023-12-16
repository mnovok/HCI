import styles from './signin.module.css';
import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import logoImage from '../../../public/images/logo.png';
import Image from 'next/image';

export default function SigninPage() {
    return(
        <div className={styles.main}>
            <div className={styles.loginBox}>
                <div className={styles.logoWrapper}>
                    <Image src={logoImage} alt="Logo" width={200} height={200} />
                </div>
                <h1>Welcome back!</h1>
                <form>
                    <input type="text" placeholder="Email" autoFocus />
                    <input type="password" placeholder="Password" />

                    <div className={styles.signupContainer}>
                        <span>Don't have an account?</span>
                        <Link href={'/signup'}>
                            <p className={styles.signup}>Sign up</p>
                        </Link>
                    </div>

                    <div className={styles.buttonContainer}>
                    <Link
                        href={{
                        pathname: "/login",}}
                        className={clsx(
                        "rounded-3xl border bg-[#065E35] px-12 py-2  text-green-100 hover:bg-[#B3E0CA] hover:text-[#065E33] text-xl text-center uppercase",
                        )}>
                        Login
                    </Link>
                    </div>
                </form>
        </div>
    </div>
    );
}
