import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { UploadDropzone } from "react-uploader";
import { Uploader } from "uploader";

// Get production API keys from Upload.io
const uploader = Uploader({
  apiKey: "free",
});

// Customize the file upload UI (see "customization"):
const options = { maxFileCount: 1, mimeTypes: ["image/jpeg", "image/png", "image/jpg"], editor: { images: { crop: false } } };

const Home: NextPage = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const UploadDropZone = () => (
    <UploadDropzone
      uploader={uploader} // Required.
      options={options} // Optional.
      onUpdate={(file) => {
        if (file.length === 0) {
          console.log("No files selected.");
        } else {
          console.log("File selected: ", file[0].fileUrl);
          setImageUrl(file[0].fileUrl);
          generatePhoto(file[0].fileUrl);
        }
      }}
      width="600px"
      height="200px"
    />
  );

  async function generatePhoto(fileUrl: string) {
    try {
      setLoading(true);
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl: fileUrl }),
      });

      let newPhoto = await res.json();
      setRestoredImage(newPhoto);
      setLoading(false);
    } catch (e) {
      console.log("error", e);
    }
  }

  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Restore Photos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex justify-between items-center w-full mt-5 border-b-2 pb-7 sm:px-4 px-2">
        <div className="flex space-x-2">
          <img src="/imageIcon.png" className="sm:w-14 sm:h-14 w-9 h-9" />
          <h1 className="sm:text-5xl text-3xl font-bold ml-2 tracking-tight">restorePhotos.io</h1>
        </div>
        <a href="https://github.com/Nutlope/whatisdevrel" target="_blank" rel="noreferrer">
          <img src="/githubIcon.png" className="sm:w-10 sm:h-10 w-8 h-8" />
        </a>
      </header>
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-28 mt-20">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-slate-900 sm:text-7xl">
          Restoring old photos{" "}
          <span className="relative whitespace-nowrap text-blue-600">
            <svg aria-hidden="true" viewBox="0 0 418 42" className="absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-300/70" preserveAspectRatio="none">
              <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
            </svg>
            <span className="relative">using AI</span>
          </span>{" "}
          for everyone.
        </h1>
        <p className="mx-auto mt-12 max-w-xl text-lg text-slate-700 leading-7">Have old and blurry photos? Let our AI restore them so those memories can live on. Restore your old photos today – 100% free.</p>
        <button className="bg-black rounded-full text-white font-medium px-4 py-2 mt-8 hover:bg-black/80">Restore your photos</button>
        <div className="flex justify-between items-center w-full flex-col mt-6">
          <div className="flex flex-col space-y-10 mt-4">
            <div className="flex sm:space-x-2 sm:flex-row flex-col">
              <img src="originalLilBro.png" className="w-80 rounded-2xl" />
              <img src="restoredLilBro.png" className="w-80 rounded-2xl sm:mt-0 mt-2" />
            </div>
          </div>
          <p className="text-gray-400 mt-2">Check out this sweet photo restoration of my little brother.</p>
          {/* {!imageUrl && <UploadDropZone />}
          {imageUrl && <img src={imageUrl} className="sm:h-80 h-60" />}
          {imageUrl && (
            <button onClick={() => setImageUrl(null)} className="bg-blue-500 rounded-xl p-3 mt-5 mb-2">
              Upload New Photo
            </button>
          )}
          {restoredImage && <img src={restoredImage} className="sm:h-80 h-60" />}
          {loading && <p>Loading...</p>} */}
        </div>
      </main>

      <footer className="text-center sm:h-20 h-16 w-full sm:pt-8 pt-6 border-t-2 mt-5">
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
    </div>
  );
};

export default Home;
