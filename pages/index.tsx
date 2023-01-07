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
      width="500px"
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

      <header className="flex justify-between items-center w-full mt-5 border-b-2 pb-7 sm:px-0 px-2">
        <div className="flex space-x-2">
          <img src="/picture.png" className="sm:w-14 sm:h-14 w-9 h-9" />
          <h1 className="sm:text-5xl text-3xl font-bold ml-2 tracking-tight">restorePhotos.io</h1>
        </div>
        <a href="https://github.com/Nutlope/whatisdevrel" target="_blank" rel="noreferrer">
          <img src="/github-mark.png" className="sm:w-10 sm:h-10 w-8 h-8" />
        </a>
      </header>
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-10">
        <h1 className="text-5xl sm:text-6xl font-bold mb-5">
          <span>
            Restore <span className="">Old and Blurry</span> Photos!
          </span>
        </h1>
        <p className="max-w-2xl">Have old and blurry photos from your childhood? Let our AI restore them for you so those old memories can live on. Restore your old photos today – 100% free.</p>
        {/* Input for a photo upload */}
        <div className="flex justify-between items-center w-full flex-col">
          {!imageUrl && <UploadDropZone />}
          {imageUrl && <img src={imageUrl} className="sm:h-80 h-60" />}
          {imageUrl && (
            <button onClick={() => setImageUrl(null)} className="bg-blue-500 rounded-xl p-3 mt-5 mb-2">
              Upload New Photo
            </button>
          )}
          {restoredImage && <img src={restoredImage} className="sm:h-80 h-60" />}
          {loading && <p>Loading...</p>}
          <div className="flex flex-col space-y-10">
            <h1 className="text-5xl">Examples:</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum unde distinctio nesciunt nostrum, omnis pariatur vero velit cupiditate facere! Inventore magnam sunt itaque quidem dignissimos ad nulla voluptatibus. Iusto, cumque.</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum unde distinctio nesciunt nostrum, omnis pariatur vero velit cupiditate facere! Inventore magnam sunt itaque quidem dignissimos ad nulla voluptatibus. Iusto, cumque.</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum unde distinctio nesciunt nostrum, omnis pariatur vero velit cupiditate facere! Inventore magnam sunt itaque quidem dignissimos ad nulla voluptatibus. Iusto, cumque.</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum unde distinctio nesciunt nostrum, omnis pariatur vero velit cupiditate facere! Inventore magnam sunt itaque quidem dignissimos ad nulla voluptatibus. Iusto, cumque.</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum unde distinctio nesciunt nostrum, omnis pariatur vero velit cupiditate facere! Inventore magnam sunt itaque quidem dignissimos ad nulla voluptatibus. Iusto, cumque.</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum unde distinctio nesciunt nostrum, omnis pariatur vero velit cupiditate facere! Inventore magnam sunt itaque quidem dignissimos ad nulla voluptatibus. Iusto, cumque.</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum unde distinctio nesciunt nostrum, omnis pariatur vero velit cupiditate facere! Inventore magnam sunt itaque quidem dignissimos ad nulla voluptatibus. Iusto, cumque.</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum unde distinctio nesciunt nostrum, omnis pariatur vero velit cupiditate facere! Inventore magnam sunt itaque quidem dignissimos ad nulla voluptatibus. Iusto, cumque.</p>
          </div>
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
