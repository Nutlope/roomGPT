import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full mt-5 border-b-2 pb-7 sm:px-4 px-2">
      <Link href="/" className="flex space-x-2">
        <img src="/imageIcon.png" className="sm:w-14 sm:h-14 w-9 h-9" />
        <h1 className="sm:text-5xl text-3xl font-bold ml-2 tracking-tight">restorePhotos.io</h1>
      </Link>
      {/* TODO: Replace with correct link */}
      <a href="https://github.com/Nutlope/whatisdevrel" target="_blank" rel="noreferrer">
        <img src="/githubIcon.png" className="sm:w-10 sm:h-10 w-8 h-8" />
      </a>
    </header>
  );
}
