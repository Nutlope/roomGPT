import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full mt-5 border-b-2 pb-7 sm:px-4 px-2">
      <Link href="/" className="flex space-x-2">
        <Image
          alt="header text"
          src="/imageIcon.png"
          className="sm:w-14 sm:h-14 w-9 h-9"
          width={36}
          height={36}
        />
        <h1 className="sm:text-5xl text-3xl font-bold ml-2 tracking-tight">
          restorePhotos.io
        </h1>
      </Link>
      {/* TODO: Replace this link to Vercel Templates Marketplace */}
      <a
        href="https://github.com/Nutlope/restorePhotos"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          alt="Vercel Icon"
          src="/vercelLogo.png"
          className="sm:w-10 sm:h-10 w-8 h-8"
          width={32}
          height={32}
        />
      </a>
    </header>
  );
}
