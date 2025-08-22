import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

interface HeaderProps {
    headerText: string;
}


function Header(props: HeaderProps) {
    return (
        <header className="border-b border-gray-200 bg-black p-4 shadow-sm flex items-center gap-2 mb-4">
            <Link href="/">
                {props.headerText === "Hangout Slots" ? null : <ArrowBackIcon className="text-white" /> }
            </Link>
            <h1 className="text-2xl font-semibold text-white">{props.headerText}</h1>
        </header>
    );
}

export default Header;