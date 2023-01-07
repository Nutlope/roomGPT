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
        }
      }}
      width="600px"
      height="375px"
    />
  );

  return (
    <div className="flex min-h-screen max-w-6xl mx-auto flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center text-center px-20">
        <h1 className="text-5xl sm:text-6xl font-bold mb-5">
          Welcome to <span className="text-blue-600">Restore Photos!</span>
        </h1>
        {/* Input for a photo upload */}
        <div className="flex justify-between items-center border w-full">
          <UploadDropZone />
          {imageUrl && (
            <a href={imageUrl}>
              {" "}
              <img src={imageUrl} className="h-80" />
            </a>
          )}
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a className="flex items-center justify-center gap-2" href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app" target="_blank" rel="noopener noreferrer">
          Powered by Next.js, Vercel, and Replicate.
        </a>
        {/* Also include GitHub Repo */}
      </footer>
    </div>
  );
};

export default Home;
