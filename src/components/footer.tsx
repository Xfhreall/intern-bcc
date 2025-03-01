import Link from "next/link";

import {
  TwitterIcon,
  InstagramIcon,
  EmailIcon,
  YoutubeIcon,
} from "@/public/icon/socialMedia";

export const Footer = () => {
  return (
    <footer className="py-10 text-white bg-primary">
      <div className="container px-12 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Nautikara</h2>
            <p className="text-lg">Save the Ocean, Save the Future!</p>

            <div className="flex space-x-4">
              <Link aria-label="Twitter" href="#">
                <TwitterIcon className="w-6 h-6 text-white transition-colors hover:text-gray-300" />
              </Link>
              <Link aria-label="Instagram" href="#">
                <InstagramIcon className="w-6 h-6 text-white transition-colors hover:text-gray-300" />
              </Link>
              <Link aria-label="Email" href="#">
                <EmailIcon className="w-6 h-6 text-white transition-colors hover:text-gray-300" />
              </Link>
              <Link aria-label="YouTube" href="#">
                <YoutubeIcon className="w-6 h-6 text-white transition-colors hover:text-gray-300" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link className="hover:underline" href="#">
                    Donate
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="#">
                    Report
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="#">
                    Event
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="#">
                    News
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Help</h3>
              <ul className="space-y-2">
                <li>
                  <Link className="hover:underline" href="#">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="#">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="#">
                    Accessibility
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="#">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="#">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4 ">
            <h3 className="text-xl font-semibold">Contact Us</h3>
            <address className="space-y-2 not-italic">
              <p>Jl. Brawijaya No. 321</p>
              <p>Malang, Indonesia 12345</p>
              <p>Phone: (+62) 821 405 382 02</p>
              <p>
                Email:{" "}
                <Link
                  className="hover:underline"
                  href="mailto:Contact@Company.com"
                >
                  Contact@Company.com
                </Link>
              </p>
            </address>
          </div>
        </div>
        <div className="pt-6 mt-10 border-t border-blue-400">
          <p className="font-medium">© 2025 NAUTIKARA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
