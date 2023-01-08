export default function Footer() {
  return (
    <footer className="text-center sm:h-20 h-16 w-full sm:pt-8 pt-2 border-t-2 mt-5">
      Powered by{" "}
      <a href="https://nextjs.org/" target="_blank" rel="noreferrer" className="font-bold hover:underline transition underline-offset-2">
        Next.js
      </a>
      ,{" "}
      <a href="https://vercel.com/" target="_blank" rel="noreferrer" className="font-bold hover:underline transition underline-offset-2">
        Vercel
      </a>
      , and{" "}
      <a href="https://replicate.com/" target="_blank" rel="noreferrer" className="font-bold hover:underline transition underline-offset-2">
        Replicate
      </a>
      .
    </footer>
  );
}
