interface HeaderProps {
    headerText: string;
}


function Header(props: HeaderProps) {
    return (
        <header className="border-b border-gray-200 bg-black p-4 shadow-sm">
            <h1 className="text-2xl font-semibold text-white">{props.headerText}</h1>
        </header>
    );
}

export default Header;