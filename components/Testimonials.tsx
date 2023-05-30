import Image from "next/image";

const testimonials = [
  [
    {
      content:
        "With Instacarol, I can effortlessly convert my written copy into engaging carousels that grab attention and spark conversations. It's a fantastic way to breathe new life into my content and connect with my audience on a whole new level.",
      // link: "https://twitter.com/eveporcello/status/1631438728999899136",
      author: {
        name: "Jane S.",
        role: "Growth Marketer",
        image: "/eve.jpg",
      },
    },

    {
      content:
        "I've always believed in the power of recycling and repurposing content, and this tool takes it to the next level. It allows me to easily transform my old LinkedIn posts into fresh and visually appealing carousels.",
      // link: "https://twitter.com/arthur_dvorkin/status/1631402865209274369",
      author: {
        name: "Michael P.",
        role: "Management Consultant",
        image: "/arthur.jpg",
      },
    },
  ],
  [
    {
      content:
        "Copying and repurposing other people's popular posts as carousels is a genius strategy that this tool enables. I can now curate and transform compelling content into visually captivating carousels that align with my own messaging and branding.",
      // link: "https://www.tiktok.com/@thenubians/video/7206088336044313861?q=Instacarol.ai&t=1677909079689",
      author: {
        name: "Sarah R.",
        role: "Career Coach",
        image: "/ade.jpeg",
      },
    },
    {
      content:
        "I love the versatility this tool brings to my LinkedIn strategy. Whether I'm sharing industry insights, case studies, or motivational content, converting it into captivating carousels amplifies its impact.",
      // link: "https://twitter.com/RobAttfield/status/1631545265281974273",
      author: {
        name: "Alex M.",
        role: "People Talent",
        image: "/rob.jpg",
      },
    },
  ],
  [
    {
      content:
        "As a LinkedIn creator, my goal is to stand out and captivate my audience. This tool allows me to effortlessly transform my written content into visually stunning carousels that leave a lasting impact.",
      // link: "https://twitter.com/Music4UsAll/status/1631622608595607552",
      author: {
        name: "Samuel L.",
        role: "Business Owner",
        image: "/music.jpg",
      },
    },
    {
      content:
        "Instacarol has revolutionized how I present my expertise on LinkedIn. With just a few clicks, I can deliver my message in a visually captivating way. It's a game-changer for personal branding and establishing thought leadership.",
      // link: "https://twitter.com/github/status/1631821360619028482",
      author: {
        name: "Lisa T.",
        role: "Account Manager",
        image: "/github.jpg",
      },
    },
  ],
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-label="What our customers are saying"
      className="py-10"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 md:px-7">
        <div className="mx-auto md:text-center">
          <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-gray-300 sm:text-6xl">
            Trusted and loved by LinkedIn Creators
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg sm:text-gray-400  text-gray-500 leading-7">
            Discover what people are saying about the product
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-16 lg:max-w-none lg:grid-cols-3"
        >
          {testimonials.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
                {column.map((testimonial, testimonialIndex) => (
                  <li
                    key={testimonialIndex}
                    className="hover:scale-105 transition duration-300 ease-in-out "
                  >
                    <a target="_blank" rel="noreferrer">
                      <figure className="relative rounded-2xl bg-gray-600 p-6 shadow-xl shadow-slate-900/10">
                        <blockquote className="relative">
                          <p className="text-lg tracking-tight text-white">
                            "{testimonial.content}"
                          </p>
                        </blockquote>
                        <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                          <div>
                            <div className="font-display text-base text-white">
                              {testimonial.author.name}
                            </div>
                            <div className="mt-1 text-sm text-gray-400">
                              {testimonial.author.role}
                            </div>
                          </div>
                          {/* <div className="overflow-hidden rounded-full bg-slate-50">
                            <Image
                              className="h-14 w-14 object-cover"
                              src={testimonial.author.image}
                              alt="picture of the testimonial author"
                              width={56}
                              height={56}
                            />
                          </div> */}
                        </figcaption>
                      </figure>
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
