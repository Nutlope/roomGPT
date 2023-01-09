import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SquigglyLines from "../components/SquigglyLines";
import { Testimonials } from "../components/Testimonials";

const Home: NextPage = () => {
  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Face Photo Restorer</title>
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-20">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-slate-900 sm:text-7xl">
          Restoring old photos{" "}
          <span className="relative whitespace-nowrap text-[#3290EE]">
            <SquigglyLines />
            <span className="relative">using AI</span>
          </span>{" "}
          for everyone.
        </h1>
        <p className="mx-auto mt-12 max-w-xl text-lg text-slate-700 leading-7">
          Have old and blurry face photos? Let our AI restore them so those
          memories can live on. 100% free – restore your photos today.
        </p>
        <Link
          className="bg-black rounded-full text-white font-medium px-4 py-2 mt-8 hover:bg-black/80"
          href="/restore"
        >
          Restore your photos
        </Link>
        <div className="flex justify-between items-center w-full flex-col mt-6">
          <div className="flex flex-col space-y-10 mt-4">
            <div className="flex sm:space-x-2 sm:flex-row flex-col">
              <div>
                <h2 className="mb-1 font-medium text-lg">Original Photo</h2>
                <Image
                  alt="Original photo of my bro"
                  src="/originalbro.png"
                  className="w-80 rounded-2xl"
                  width={300}
                  height={300}
                />
              </div>
              <div className="sm:mt-0 mt-8">
                <h2 className="mb-1 font-medium text-lg">Restored Photo</h2>
                <Image
                  alt="Restored photo of my bro"
                  width={300}
                  height={300}
                  src="/restoredbro.png"
                  className="w-80 rounded-2xl sm:mt-0 mt-2"
                />
              </div>
            </div>
          </div>
          <p className="text-gray-500 mt-3 mb-10 sm:text-base text-sm">
            Check out this photo restoration of my little brother.
          </p>
        </div>
      </main>
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
