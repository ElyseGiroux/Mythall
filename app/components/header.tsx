"use client";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/20/solid";

const links = [
  {
    name: "Accueil",
    href: "/",
  },
  {
    name: "Bible",
    href: "https://www.dropbox.com/s/elxvrvw00rx1970/6-Bible%20de%20Mythall%20V3.5.pdf?e=1&dl=0",
    target: "_blank",
  },
  {
    name: "À Propos",
    href: "a-propos",
    dropdown: [
      { name: "Qui sommes-nous", href: "qui-sommes-nous" },
      { name: "Règlements", href: "reglements" },
      {
        name: "Décharge de responsabilité",
        href: "https://www.dropbox.com/scl/fi/ihdw9nzsqp219ax5g2ww7/D-charge-Responsapilit-2024.pdf?rlkey=ho500szb810k11nspio24dfxi&e=1&dl=0",
        target: "_blank",
      },
      { name: "Remerciements", href: "remerciements" },
    ],
  },
  // {
  //   name: "Jeu",
  //   href: "/",
  //   dropdown: [
  //     { name: "Races", href: "jeu/races" },
  //     { name: "Classes", href: "jeu/classes" },
  //     { name: "Dons", href: "jeu/dons" },
  //     { name: "Fourberies", href: "jeu/fourberies" },
  //     { name: "Sorts", href: "jeu/sorts" },
  //   ],
  // },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b-2 border-accent bg-gradient-to-br z-10 from-zinc-900 to-primary py-8 drop-shadow-xl">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 z-10"
        aria-label="Global">
        <div className="flex lg:flex-1">
          <Link
            href="/"
            className="-m-1.5 p-1.5">
            <span className="sr-only">Mythall</span>
            <Image
              className="h-8 w-auto"
              src="/img/logo-white.png"
              alt="Mythall"
              width="1462"
              height="502"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white hover:text-accent transition"
            onClick={() => setMobileMenuOpen(true)}>
            <span className="sr-only">Open main menu</span>
            <Bars3Icon
              className="h-6 w-6"
              aria-hidden="true"
            />
          </button>
        </div>

        <PopoverGroup className="hidden lg:flex lg:gap-x-12 z-10">
          {links.map((link) =>
            link.dropdown ? (
              <Popover className="relative z-10">
                <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-white hover:text-accent transition z-10">
                  {link.name}
                  <ChevronDownIcon
                    className="h-5 w-5 flex-none text-white"
                    aria-hidden="true"
                  />
                </PopoverButton>

                <Transition
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1">
                  <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-56 rounded-xl bg-primary p-2 shadow-lg ring-1 ring-gray-900/5">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        target={item.target ? item.target : ""}
                        className="block rounded-lg px-3 py-2 z-10 text-sm font-semibold leading-6 text-white hover:bg-accent">
                        {item.name}
                      </Link>
                    ))}
                  </PopoverPanel>
                </Transition>
              </Popover>
            ) : (
              <Link
                href={link.href}
                target={link.target ? link.target : ""}
                className="text-sm font-semibold leading-6 text-white hover:text-accent transition">
                {link.name}
              </Link>
            )
          )}
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="generateur"
            className="text-sm font-semibold leading-6 text-white hover:text-accent transition">
            <UserCircleIcon
              className="h-6 w-6"
              aria-hidden="true"
            />
          </Link>
        </div>
      </nav>

      {/* Mobile */}
      <Dialog
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}>
        <div className="fixed inset-0" />
        <DialogPanel className="fixed inset-y-0 right-0 w-full overflow-y-auto bg-primary px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link
              href="#"
              className="-m-1.5 p-1.5">
              <span className="sr-only">Mythall</span>
              <Image
                className="h-8 w-auto"
                src="/img/logo-white.png"
                alt="Mythall"
                width="1462"
                height="502"
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-white hover:text-accent transition"
              onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Close menu</span>
              <XMarkIcon
                className="h-6 w-6"
                aria-hidden="true"
              />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {links.map((link) =>
                  link.dropdown ? (
                    <Disclosure
                      as="div"
                      className="-mx-3">
                      {({ open }) => (
                        <>
                          <DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-white hover:text-accent transition">
                            {link.name}
                            <ChevronDownIcon
                              className={classNames(open ? "rotate-180" : "", "h-5 w-5 flex-none")}
                              aria-hidden="true"
                            />
                          </DisclosureButton>
                          <DisclosurePanel className="mt-2 space-y-2">
                            {[...link.dropdown].map((item) => (
                              <DisclosureButton
                                key={item.name}
                                as="a"
                                href={item.href}
                                target={item.target ? item.target : ""}
                                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-white hover:text-accent transition">
                                {item.name}
                              </DisclosureButton>
                            ))}
                          </DisclosurePanel>
                        </>
                      )}
                    </Disclosure>
                  ) : (
                    <Link
                      href={link.href}
                      target={link.target ? link.target : ""}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:text-accent transition">
                      {link.name}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
