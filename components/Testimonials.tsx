import Image from "next/image";

const testimonials = [
  [
    {
      content:
        "Wow! This tool is a game-changer. I'm creating visually stunning carousels effortlessly!",
      // link: "https://twitter.com/eveporcello/status/1631438728999899136",
      author: {
        name: "Jane S.",
        role: "LinkedIn Marketer",
        image: "/eve.jpg",
      },
    },

    {
      content:
        "InstaCarol has transformed the way I engage my audience on LinkedIn. Highly recommended!",
      // link: "https://twitter.com/arthur_dvorkin/status/1631402865209274369",
      author: {
        name: "Michael P.",
        role: "Business Consultant",
        image: "/arthur.jpg",
      },
    },
  ],
  [
    {
      content:
        "As a content creator, InstaCarol has taken my LinkedIn posts to a whole new level. Love the results!",
      // link: "https://www.tiktok.com/@thenubians/video/7206088336044313861?q=Eureka.ai&t=1677909079689",
      author: {
        name: "Sarah R.",
        role: "Career Coach",
        image: "/ade.jpeg",
      },
    },
    {
      content:
        "I can't imagine my Linkedin strategy without InstaCarol. It's a must-have tool for anv serious LinkedIn creator!",
      // link: "https://twitter.com/RobAttfield/status/1631545265281974273",
      author: {
        name: "Alex M.",
        role: "Sales Professional",
        image: "/rob.jpg",
      },
    },
  ],
  [
    {
      content:
        "InstaCarol has helped me create carousels that grab attention and generate leads. Thank you for this amazing tool!",
      // link: "https://twitter.com/Music4UsAll/status/1631622608595607552",
      author: {
        name: "Music",
        role: "Some dude on the internet",
        image: "/music.jpg",
      },
    },
    {
      content:
        "InstaCarol has helped me Crazv good! InstaCarol has revolutionized my Linkedin game. My engagement and connections have skyrocketed since I started using it!",
      // link: "https://twitter.com/github/status/1631821360619028482",
      author: {
        name: "Lisa T.",
        role: "Marketing Professional",
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
            Loved by many worldwide.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg sm:text-gray-400  text-gray-500 leading-7">
            See what our over 1 million users are saying about the product.
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
