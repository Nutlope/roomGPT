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
        <title>Instacarol - Create LinkedIn Carousels Instantly ⚡</title>
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-20 mt-20 background-gradient">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-gray-300 sm:text-7xl">
          Elevate your LinkedIn
          <span className="relative whitespace-nowrap text-blue-600">
            <SquigglyLines />
            <span className="relative"> Presence </span>
          </span>{" "}
          with Instant Carousel Creation!
        </h1>
        <h2 className="mx-auto mt-12 max-w-xl text-lg sm:text-gray-400  text-gray-500 leading-7">
          Transform written copy into captivating LinkedIn carousels in a snap.
          Stand out, engage, and impress!
        </h2>
        <Link
          className="mt-12 bg-blue-600 rounded-xl text-white font-medium px-4 py-3 sm:mt-10 hover:bg-blue-500 transition"
          href="/canvas"
        >
          Try for Free
        </Link>

        <section>
          <div className="mt-10 text-center">
            <h4 className="flex-none leading-6 mt-2 text-2xl font-bold tracking-tight text-white sm:text-5xl">
              What’s included
            </h4>
          </div>
          <ul
            role="list"
            className="mt-8 flex flex-col justify-center text-gray-400 gap-6 mb-10 "
          >
            <li className="flex gap-x-3  ">
              <svg
                className="h-6 w-5 flex-none text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                />
              </svg>
              {/* <h1 className="text-center flex justify-center w-full "> */}
              Turn your copy into visualy engaging carousals
              {/* </h1> */}
            </li>

            <li className="flex gap-x-3 ">
              <svg
                className="h-6 w-5 flex-none text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                />
              </svg>
              {/* <h1 className="text-center flex justify-center w-full "> */}
              Recycle your previous content and re-post as carousels
              {/* </h1> */}
            </li>

            <li className="flex gap-x-3 ">
              <svg
                className="h-6 w-5 flex-none text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                />
              </svg>
              {/* <h1 className="text-center flex justify-center w-full "> */}
              Copy and repurpose popular LinkedIn posts as carousels
              {/* </h1> */}
            </li>
          </ul>
        </section>
        {/* <section className="py-24 overflow-hidden">
          <h1 className="mb-8 font-medium text-4xl">
            Instacarol supercharges your storytelling
          </h1>
          <div className="container px-4 mx-auto">
            <div className="flex flex-wrap max-w-5xl mx-auto -m-3">
              <div className="w-full md:w-1/3 p-3 border-2 border-black">
                <div className="py-8 px-12 h-full text-center bg-white rounded-xl">
                  <h2 className="mb-3 text-6xl md:text-5xl xl:text-10xl text-blue-600 text-center font-bold font-heading tracking-px-n leading-none  ">
                    10x cheaper
                  </h2>
                  <p className="text-gray-700 font-medium leading-relaxed">
                    than hiring a designer
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/3 p-3">
                <div className="py-8 px-12 h-full text-center bg-white rounded-xl">
                  <h2 className="mb-3 text-6xl md:text-5xl xl:text-10xl text-blue-600 text-center font-bold font-heading tracking-px-n leading-none">
                    20x faster
                  </h2>
                  <p className="text-gray-700 font-medium leading-relaxed">
                    than using canva
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/3 p-3">
                <div className="py-8 px-12 h-full text-center bg-white rounded-xl">
                  <h2 className="mb-3 text-6xl md:text-5xl xl:text-10xl text-blue-600 text-center font-bold font-heading tracking-px-n leading-none">
                    Spend more time creating
                  </h2>
                  <p className="text-gray-700 font-medium leading-relaxed">
                    Instacarol takes care of the editing and designing for you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        <div className="flex justify-between items-center w-full flex-col sm:mt-10 mt-6">
          <div className="flex flex-col space-y-10 mt-4 mb-16">
            <div className="flex sm:space-x-8 sm:flex-row flex-col">
              <div>
                <h3 className="mb-1 font-medium text-lg">Written copy</h3>
                <Image
                  alt="Original photo of a room"
                  src="/1-j.jpeg"
                  className="w-full object-cover h-96 rounded-2xl"
                  width={400}
                  height={400}
                />
              </div>
              <div className="sm:mt-0 mt-8">
                <h3 className="mb-1 font-medium text-lg">
                  Generated Carousels
                </h3>
                <Image
                  alt="Generated photo of a room with roomGPT.io"
                  width={400}
                  height={400}
                  src="/2-i.jpeg"
                  className="w-full object-cover h-96 rounded-2xl sm:mt-0 mt-2"
                />
              </div>
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
