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
        <title>GetVisual</title>
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-20 mt-20 background-gradient">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-gray-300 sm:text-7xl">
          Generate Visuals from{" "}
          <span className="relative whitespace-nowrap text-blue-600">
            <SquigglyLines />
            <span className="relative">Your Content</span>
          </span>{" "}
        </h1>
        <h2 className="mx-auto mt-12 max-w-xl text-lg sm:text-gray-400  text-gray-500 leading-7">
          Start with pasting your content below
        </h2>
        <textarea
          className="rounded-xl mt-8 bg-black"
          rows={5}
          cols={80}
        ></textarea>
        <Link
          className="bg-blue-600 rounded-xl text-white font-medium px-4 py-3 sm:mt-10 hover:bg-blue-500 transition"
          href="/canvas"
        >
          Generate Your Visualisation
        </Link>
        <div className="flex justify-between items-center w-full flex-col sm:mt-10 mt-6">
          <h3 className="mb-1 font-medium text-lg">Generated Contents</h3>

          <div className="flex flex-col space-y-10 mt-4 mb-16">
            <div className="flex sm:space-x-8 sm:flex-row flex-col">
              <div>
                {/* <h3 className="mb-1 font-medium text-lg">Original Room</h3> */}
                <Image
                  alt="Original photo of a room with skia.ai"
                  src="/sample1/1.png"
                  className="w-full object-cover h-96 rounded-2xl"
                  width={400}
                  height={400}
                />
              </div>
              <div className="sm:mt-0 mt-8">
                <Image
                  alt="Generated photo of a room with skia.ai"
                  width={400}
                  height={400}
                  src="/sample1/2.png"
                  className="w-full object-cover h-96 rounded-2xl sm:mt-0 mt-2"
                />
              </div>
              {/* <div className="sm:mt-0 mt-8">
                <Image
                  alt="Generated photo of a room with skia.ai"
                  width={400}
                  height={400}
                  src="/sample1/3.png"
                  className="w-full object-cover h-96 rounded-2xl sm:mt-0 mt-2"
                />
              </div> */}
              {/* <div className="sm:mt-0 mt-8">
                <Image
                  alt="Generated photo of a room with skia.ai"
                  width={400}
                  height={400}
                  src="/sample1/4.png"
                  className="w-full object-cover h-96 rounded-2xl sm:mt-0 mt-2"
                />
              </div> */}
            </div>
          </div>
        </div>
      </main>
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
