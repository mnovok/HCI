import { FC } from "react";
import Image from 'next/image'
import logo from 'public/images/logo.png' 

const Logo: FC = () => (
    <Image src={logo} alt="Logo"/>
);

export default Logo;