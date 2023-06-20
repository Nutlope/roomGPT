import { AnimatePresence, motion } from "framer-motion";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { UploadDropzone } from "react-uploader";
import { Uploader } from "uploader";
import { CompareSlider } from "../components/CompareSlider";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import ResizablePanel from "../components/ResizablePanel";
import Toggle from "../components/Toggle";
import appendNewToName from "../utils/appendNewToName";
import downloadPhoto from "../utils/downloadPhoto";
import DropDown from "../components/DropDown";
import { roomType, rooms, themeType, themes } from "../utils/dropdownTypes";
import { GenerateResponseData } from "./api/generate";
import { useSession, signIn } from "next-auth/react";
import useSWR from "swr";
import { Rings } from "react-loader-spinner";
import Link from "next/link";
import { useRouter } from "next/router";
import { Toaster, toast } from "react-hot-toast";
import CanvasPage from "../components/Canvas";
import axios from "axios";
import downloadPDF from "../utils/downloadPDF";

// Configuration for the uploader
const uploader = Uploader({
  apiKey: !!process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    ? process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    : "free",
});
type ChatGPTResponse = {
  result: string;
};

interface contentProps {
  index: any;
  content: string;
  desc?: string;
  type: any;
}

const Home: NextPage = () => {
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [contentSum, setContentSum] = useState<contentProps[]>([]);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [restoredLoaded, setRestoredLoaded] = useState<boolean>(false);
  const [sideBySide, setSideBySide] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [theme, setTheme] = useState<themeType>("Modern");
  const [room, setRoom] = useState<roomType>("Living Room");

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, mutate } = useSWR("/api/remaining", fetcher);
  const { data: session, status } = useSession();

  const options = {
    maxFileCount: 1,
    mimeTypes: ["image/jpeg", "image/png", "image/jpg"],
    editor: { images: { crop: false } },
    tags: [data?.remainingGenerations > 3 ? "paid" : "free"],
    styles: {
      colors: {
        primary: "#2563EB", // Primary buttons & links
        error: "#d23f4d", // Error messages
        shade100: "#fff", // Standard text
        shade200: "#fffe", // Secondary button text
        shade300: "#fffd", // Secondary button text (hover)
        shade400: "#fffc", // Welcome text
        shade500: "#fff9", // Modal close button
        shade600: "#fff7", // Border
        shade700: "#fff2", // Progress indicator background
        shade800: "#fff1", // File item background
        shade900: "#ffff", // Various (draggable crop buttons, etc.)
      },
    },
    onValidate: async (file: File): Promise<undefined | string> => {
      return data.remainingGenerations === 0
        ? `No more credits left. Buy more above.`
        : undefined;
    },
  };

  const UploadDropZone = () => (
    <UploadDropzone
      uploader={uploader}
      options={options}
      onUpdate={(file) => {
        if (file.length !== 0) {
          setPhotoName(file[0].originalFile.originalFileName);
          setOriginalPhoto(file[0].fileUrl.replace("raw", "thumbnail"));
          generatePhoto(file[0].fileUrl.replace("raw", "thumbnail"));
        }
      }}
      width="670px"
      height="250px"
    />
  );

  function parseContent2(raw: string): any {
    try {
      const regex = /^\s*\d+\.\s*(.*)$/gm;
      const points = [];
      let match;

      while ((match = regex.exec(raw))) {
        points.push(match[1]);
      }

      return points.map((item, index) => {
        var point = item
          .replace(/^\d+\. \s*/, "")
          .replace("[Hook] ", "")
          .replace("[Call to Action] ", "");

        return {
          index,
          type: "content",
          // index === 0
          //   ? "content"
          //   : index !== points.length - 1
          //   ? "content"
          //   : "end",
          desc: point,
        };
      });
    } catch (error) {
      alert("We are working to fix the problem. Please try again later");
    }
  }

  const generateContent = async (event?: any) => {
    event?.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        if (data.error.message) {
          setLoading(false);
          return alert(data.error.message);
        }
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      const content = parseContent2(data.result);
      if (content.length === 0) {
        generateContent(null);
        return;
      }
      setContentSum(content);
      setLoading(false);
    } catch (error: any) {
      // Consider implementing your own error handling logic here
      setLoading(false);
      // alert("We are working to fix the problem. Please try again later");
      generateContent(null);
    }
  };

  async function generatePhoto(fileUrl: string) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl: fileUrl, theme, room }),
    });

    let response = (await res.json()) as GenerateResponseData;
    if (res.status !== 200) {
      setError(response as any);
    } else {
      mutate();
      const rooms =
        (JSON.parse(localStorage.getItem("rooms") || "[]") as string[]) || [];
      rooms.push(response.id);
      localStorage.setItem("rooms", JSON.stringify(rooms));
      setRestoredImage(response.generated);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1300);
  }

  const router = useRouter();

  useEffect(() => {
    if (router.query.success === "true") {
      toast.success("Payment successful!");
    }
  }, [router.query.success]);
  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Instacarol</title>
      </Head>
      <Header
        photo={session?.user?.image || undefined}
        email={session?.user?.email || undefined}
      />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-4 sm:mb-0 mb-8">
        {status === "authenticated" ? (
          <Link
            href="/pricing"
            className="border border-gray-700 rounded-2xl py-2 px-4 text-gray-400 text-sm my-6 duration-300 ease-in-out hover:text-gray-300 hover:scale-105 transition"
          >
            Pricing is now available.{" "}
            <span className="font-semibold text-gray-200">Click here</span> to
            upgrade!
          </Link>
        ) : (
          <a
            href="https://twitter.com/nutlope/status/1635674124738523139?cxt=HHwWhsCz1ei8irMtAAAA"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-700 rounded-2xl py-2 px-4 text-gray-400 text-sm my-6 duration-300 ease-in-out hover:text-gray-300 transition"
          >
            Over{" "}
            <span className="font-semibold text-gray-200">
              Thousands of users
            </span>{" "}
            have used Instacarol so far
          </a>
        )}
        {status === "authenticated" && contentSum?.length === 0 && (
          <>
            <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-slate-100 sm:text-6xl mb-5">
              Transform Copy into Engaging{" "}
              <div className="text-blue-600">Linkedin Carousels</div>
            </h1>
            <h2 className="text-2xl bold mb-1">
              Enter your Linkedin post copy
            </h2>
            <h3 className="max-w-3xl">
              <br />
              Some ideas:
              <br />
              1) Start typing new LinkedIn post copy
              <br />
              2) Copy/paste one of your old LinkedIn post
              <br />
              3) Copy/paste a popular Linkedin post you recently saw and make it
              your own!
            </h3>
          </>
        )}
        {status === "authenticated" && contentSum?.length > 0 && (
          <>
            <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-slate-100 sm:text-6xl mb-5">
              Edit & Download your{" "}
              <span className="text-blue-600"> Linkedin Carousel</span>
            </h1>
          </>
        )}
        {status === "authenticated" && data && contentSum?.length > 0 && (
          <p className="text-gray-400">
            Click text to edit copy
            {/* You have{" "}
            <span className="font-semibold text-gray-300">
              {data.remainingGenerations}{" "}
              {data?.remainingGenerations > 1 ? "downloads" : "download"}
            </span>{" "}
            left.{" "}
            {data.remainingGenerations < 2 && (
              <span>
                Upgrade{" "}
                <Link
                  href="/pricing"
                  className="font-semibold text-gray-300 underline underline-offset-2 hover:text-gray-200 transition"
                >
                  here
                </Link>
                .
              </span>
            )} */}
          </p>
        )}
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="flex justify-between items-center w-full flex-col">
              {restoredImage && (
                <div>
                  Here's your remodeled <b>{room.toLowerCase()}</b> in the{" "}
                  <b>{theme.toLowerCase()}</b> theme!{" "}
                </div>
              )}
              <div
                className={`${
                  restoredLoaded ? "visible mt-6 -ml-8" : "invisible"
                }`}
              >
                <Toggle
                  className={`${restoredLoaded ? "visible mb-6" : "invisible"}`}
                  sideBySide={sideBySide}
                  setSideBySide={(newVal) => setSideBySide(newVal)}
                />
              </div>
              {restoredLoaded && sideBySide && (
                <CompareSlider
                  original={originalPhoto!}
                  restored={restoredImage!}
                />
              )}
              {status === "loading" || loading ? (
                <div className="max-w-[670px] h-[250px] flex justify-center items-center">
                  <Rings
                    height="100"
                    width="100"
                    color="white"
                    radius="6"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="rings-loading"
                  />
                </div>
              ) : status === "authenticated" && contentSum?.length === 0 ? (
                <>
                  <textarea
                    className="rounded-xl bg-black w-full max-w-2xl p-4"
                    rows={5}
                    value={prompt}
                    minLength={150}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Please enter a minimum of 150 words to get the best carousel result"
                  ></textarea>
                  {/* <p className="mt-4">{prompt.length} chars (min 150 chars)</p> */}
                  <button
                    type="submit"
                    className="bg-blue-600 rounded-xl text-white font-medium px-4 py-3 mt-10 hover:bg-blue-500 transition disabled:bg-gray-800"
                    onClick={generateContent}
                    disabled={loading || prompt?.length < 150}
                  >
                    {loading && (
                      <span className="pr-4">
                        <LoadingDots color="white" style="large" />
                      </span>
                    )}
                    Create LinkedIn Carousel
                  </button>
                </>
              ) : (
                contentSum?.length === 0 && (
                  <div className="h-[250px] flex flex-col items-center space-y-6 max-w-[670px] -mt-8">
                    <div className="max-w-xl text-gray-300">
                      Sign in below with LinkedIn to create a free account and
                      redesign your room today. You will get 3 generations for
                      free.
                    </div>
                    <button
                      onClick={() => signIn("linkedin")}
                      className="bg-gray-200 text-black font-semibold py-3 px-6 rounded-2xl flex items-center space-x-2"
                    >
                      <Image
                        src="/linkedin.webp"
                        width={20}
                        height={20}
                        alt="linkedin's logo"
                      />
                      <span>Sign in with LinkedIn</span>
                    </button>
                  </div>
                )
              )}
              {contentSum?.length > 0 && !loading && (
                <CanvasPage
                  contentSum={contentSum}
                  generateContent={generateContent}
                />
              )}
              {/* {loading && (
                <button
                  disabled
                  className="bg-blue-500 rounded-full text-white font-medium px-4 pt-2 pb-3 mt-8 w-40"
                >
                  <span className="pt-4">
                    <LoadingDots color="white" style="large" />
                  </span>
                </button>
              )} */}
              {error && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mt-8 max-w-[575px]"
                  role="alert"
                >
                  <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    Please try again later.
                  </div>
                  <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    {error}
                  </div>
                </div>
              )}
              <div className="flex space-x-2 justify-center">
                {contentSum?.length > 0 && !loading && !error && (
                  <button
                    onClick={() => {
                      downloadPDF().then((e) => {
                        console.log(e);
                      });
                    }}
                    className="bg-blue-500 rounded-full text-white font-medium px-4 py-2 mt-8 hover:bg-blue-500/80 transition"
                  >
                    Download
                  </button>
                )}
                {contentSum?.length > 0 && !loading && (
                  <>
                    <button
                      onClick={() => {
                        setContentSum([]);
                        // setRestoredImage(null);
                        // setRestoredLoaded(false);
                        setError(null);
                      }}
                      className="bg-white rounded-full text-black border font-medium px-4 py-2 mt-8 hover:bg-gray-100 transition"
                    >
                      New
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
        <Toaster position="top-center" reverseOrder={false} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
