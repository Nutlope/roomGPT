import Image from "next/image";

const testimonials = [
  [
    {
      content:
        "Just had early access to this and it's *ridic*. Powered by @vercel x @replicatehq – also very fast.",
      link: "https://twitter.com/rauchg/status/1612233034622984192",
      author: {
        name: "Guillermo Rauch",
        role: "CEO at Vercel",
        image: "/g.jpg",
      },
    },
    {
      content:
        "This is amazing! And in the 🧵 you can see the whole open-source stack instantly deployable to Vercel",
      link: "https://twitter.com/cramforce/status/1612496954218672128",
      author: {
        name: "Malte Ubl",
        role: "CTO at Vercel",
        image: "/malte.jpg",
      },
    },
  ],
  [
    {
      content:
        "I just used it and am extremely impressed with the website and wanted to express my appreciation for the excellent design and functionality. Keep up the great work!",
      link: "https://twitter.com/phar_whaz/status/1612498030627852309",
      author: {
        name: "Fawaz Adeniji",
        role: "Software Engineer",
        image: "/fawaz.jpg",
      },
    },
    {
      content: "This is genius.",
      link: "https://twitter.com/maikbenson/status/1612310374849576968",
      author: {
        name: "Michael Benson",
        role: "Founder at Dabble Ventures",
        image: "/michael.jpg",
      },
    },
  ],
  [
    {
      content:
        "I've just used it and damn I'll keep coming back! This is so good. Great work!",
      link: "https://twitter.com/Himanil_Gole/status/1612510385504157697",
      author: {
        name: "Himanil Gole",
        role: "Designer & Founder at CBREX",
        image: "/himanil.jpg",
      },
    },
    {
      content: "Hassan, that is so cool. Can't wait to use this!",
      link: "https://twitter.com/Madisonkanna/status/1611893042306502657",
      author: {
        name: "Madison Kanna",
        role: "Programmer and YouTuber",
        image: "/madison.jpg",
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
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto md:text-center">
          <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-slate-900 sm:text-6xl">
            Loved by many worldwide.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-700 leading-7">
            See what folks are saying about the product.
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
                    className="hover:scale-105 transition duration-300 ease-in-out"
                  >
                    <a href={testimonial.link} target="_blank" rel="noreferrer">
                      <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                        <blockquote className="relative">
                          <p className="text-lg tracking-tight text-slate-900">
                            "{testimonial.content}"
                          </p>
                        </blockquote>
                        <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                          <div>
                            <div className="font-display text-base text-slate-900">
                              {testimonial.author.name}
                            </div>
                            <div className="mt-1 text-sm text-slate-500">
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
