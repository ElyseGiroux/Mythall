import Image from "next/image";
import Link from "next/link";

export default function HomeHero() {
  return (
    <section className="relative isolate z-0">
      <div className="overflow-hidden z-0">
        <div className="mx-auto z-0 max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
          <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
            <div className="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
              <Image
                className="w-full h-auto max-w-lg pb-8"
                src="/img/logo.png"
                alt="Mythall"
                width={1462}
                height={502}
                priority
              />
              <h1 className="max-w-xl text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl">
                Grandeur Nature Médiéval Fantastique en Estrie
              </h1>
              <p className="mt-6 text-lg leading-8 text-zinc-700 sm:max-w-md lg:max-w-none italic">Basée sur Les Royaumes Oubliés</p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link
                  href="generateur"
                  className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Générateur
                </Link>
                <a
                  href="#"
                  className="text-sm font-semibold leading-6 text-zinc-900 hover:text-accent transition">
                  Dates de la saison <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
              <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                <div className="relative">
                  <Image
                    className="aspect-[2/3] w-full rounded-xl bg-zinc-900/5 object-cover shadow-lg"
                    src="/img/hero/1.webp"
                    alt="Mythall"
                    width={908}
                    height={1366}
                    priority
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-zinc-900/10" />
                </div>
              </div>
              <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                <div className="relative">
                  <Image
                    className="aspect-[2/3] w-full rounded-xl bg-zinc-900/5 object-cover object-right shadow-lg"
                    src="/img/hero/2.webp"
                    alt="Mythall"
                    width={631}
                    height={1366}
                    priority
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-zinc-900/10" />
                </div>
                <div className="relative">
                  <Image
                    className="aspect-[2/3] w-full rounded-xl bg-zinc-900/5 object-cover shadow-lg"
                    src="/img/hero/3.webp"
                    alt="Mythall"
                    width={1366}
                    height={908}
                    priority
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-zinc-900/10" />
                </div>
              </div>
              <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                <div className="relative">
                  <Image
                    className="aspect-[2/3] w-full rounded-xl bg-zinc-900/5 object-cover shadow-lg"
                    src="/img/hero/4.webp"
                    alt="Mythall"
                    width={768}
                    height={1366}
                    priority
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-zinc-900/10" />
                </div>
                <div className="relative">
                  <Image
                    className="aspect-[2/3] w-full rounded-xl bg-zinc-900/5 object-cover shadow-lg"
                    src="/img/hero/5.webp"
                    alt="Mythall"
                    width={1366}
                    height={908}
                    priority
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-zinc-900/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
