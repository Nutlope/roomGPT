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
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen bg-white">
      <Head>
        <title>Instacarol - Create LinkedIn Carousels - Instantly ⚡</title>
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-20 mt-20 background-gradient">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-black sm:text-7xl">
          Create LinkedIn Carousels
          <span className="relative whitespace-nowrap text-blue-600">
            <SquigglyLines />
            <span className="relative"> Instantly ⚡</span>
          </span>{" "}
        </h1>
        <Link
          className="mt-12 bg-blue-600 rounded-xl text-white font-medium px-4 py-3 sm:mt-10 hover:bg-blue-500 transition"
          href="/canvas"
        >
          Try for Free
        </Link>
        <section className="py-24 overflow-hidden">
          <h1 className="mb-8 font-medium text-4xl">
            Instacarol supercharges your storytelling
          </h1>
          <div className="container px-4 mx-auto">
            <div className="flex flex-wrap max-w-5xl mx-auto -m-3 ">
              <div className="w-full md:w-1/3 p-3 border-black border ">
                <div className="py-8 px-12 h-full text-center bg-white rounded-xl">
                  <h2 className="mb-3 text-6xl md:text-8xl xl:text-10xl text-blue-600 text-center font-bold font-heading tracking-px-n leading-none ">
                    2x
                  </h2>
                  <p className="text-gray-700 font-medium leading-relaxed">
                    Engagement growth within a month of posting with Skia
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/3 p-3">
                <div className="py-8 px-12 h-full text-center bg-white rounded-xl">
                  <h2 className="mb-3 text-6xl md:text-8xl xl:text-10xl text-blue-600 text-center font-bold font-heading tracking-px-n leading-none">
                    50%
                  </h2>
                  <p className="text-gray-700 font-medium leading-relaxed">
                    Reduction in marketing cost
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/3 p-3">
                <div className="py-8 px-12 h-full text-center bg-white rounded-xl">
                  <h2 className="mb-3 text-6xl md:text-8xl xl:text-10xl text-blue-600 text-center font-bold font-heading tracking-px-n leading-none">
                    100+
                  </h2>
                  <p className="text-gray-700 font-medium leading-relaxed">
                    Beta users have experienced the power of Skia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <div className="flex justify-between items-center w-full flex-col sm:mt-10 mt-6">
          <h3 className="mb-1 font-medium text-lg">Generated Contents</h3>

          <div className="flex flex-col space-y-10 mt-4 mb-16">
            <div className="flex sm:space-x-8 sm:flex-row flex-col">
              <div>
                <Image
                  alt="Original photo of a room with Eureka.ai"
                  src="/sample2/1.png"
                  className="w-full object-cover h-96 rounded-2xl"
                  width={400}
                  height={400}
                />
              </div>
              <div className="sm:mt-0 mt-8">
                <Image
                  alt="Generated photo of a room with Eureka.ai"
                  width={400}
                  height={400}
                  src="/sample2/2.png"
                  className="w-full object-cover h-96 rounded-2xl sm:mt-0 mt-2"
                />
              </div>
              <div className="sm:mt-0 mt-8">
                <Image
                  alt="Generated photo of a room with Eureka.ai"
                  width={400}
                  height={400}
                  src="/sample2/3.png"
                  className="w-full object-cover h-96 rounded-2xl sm:mt-0 mt-2"
                />
              </div>
              <div className="sm:mt-0 mt-8">
                <Image
                  alt="Generated photo of a room with Eureka.ai"
                  width={400}
                  height={400}
                  src="/sample1/3.png"
                  className="w-full object-cover h-96 rounded-2xl sm:mt-0 mt-2"
                />
              </div>
              <div className="sm:mt-0 mt-8">
                <Image
                  alt="Generated photo of a room with Eureka.ai"
                  width={400}
                  height={400}
                  src="/sample1/4.png"
                  className="w-full object-cover h-96 rounded-2xl sm:mt-0 mt-2"
                />
              </div>
            </div>
          </div>
        </div> */}
      </main>
      {/* <Testimonials /> */}
      <Footer />
    </div>
  );
};

export default Home;
