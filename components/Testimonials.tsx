import Image from "next/image";

const testimonials = [
  [
    {
      content: "So good! I need this right now. Congrats on the launch!",
      link: "https://twitter.com/eveporcello/status/1631438728999899136",
      author: {
        name: "Eve Porcello",
        role: "Engineer & Author",
        image: "/eve.jpg",
      },
    },

    {
      content:
        "Finally! Something to help me get over my indecisiveness when decorating my house!",
      link: "https://twitter.com/arthur_dvorkin/status/1631402865209274369",
      author: {
        name: "Arthur Dvorkin",
        role: "Engineer",
        image: "/arthur.jpg",
      },
    },
  ],
  [
    {
      content:
        "This is incredible, you don't need an interior designer anymore.",
      link: "https://www.tiktok.com/@thenubians/video/7206088336044313861?q=roomgpt.io&t=1677909079689",
      author: {
        name: "Ade Dada",
        role: "Startup Founder",
        image: "/ade.jpeg",
      },
    },
    {
      content:
        "I haven't changed my room layout for 5 years, but this app may change that. Great job.",
      link: "https://twitter.com/RobAttfield/status/1631545265281974273",
      author: {
        name: "Rob Attfield",
        role: "Software Engineer",
        image: "/rob.jpg",
      },
    },
  ],
  [
    {
      content:
        "This is fantastic. I've already decided on a new wall color from a generated image and repainting it is now my weekend project.",
      link: "https://twitter.com/Music4UsAll/status/1631622608595607552",
      author: {
        name: "Music",
        role: "Some dude on the internet",
        image: "/music.jpg",
      },
    },
    {
      content: "🤯",
      link: "https://twitter.com/github/status/1631821360619028482",
      author: {
        name: "GitHub",
        role: "The one and only",
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
            See what our 92,000+ users are saying about the product.
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
                    <a href={testimonial.link} target="_blank" rel="noreferrer">
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
                          <div className="overflow-hidden rounded-full bg-slate-50">
                            <Image
                              className="h-14 w-14 object-cover"
                              src={testimonial.author.image}
                              alt="picture of the testimonial author"
                              width={56}
                              height={56}
                            />
                          </div>
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
