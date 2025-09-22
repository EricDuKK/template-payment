import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-8 md:py-12">
          {/* Top area */}
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between mb-12 md:mb-6">
            <div className="shrink-0 mr-4">
              {/* Logo */}
              <Link
                className="inline-flex group mb-8 sm:mb-0"
                href="/"
                aria-label="AI编程"
              >
                <svg
                  viewBox="0 0 1448 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="8751"
                  width="32"
                  height="32"
                >
                  <path
                    d="M830.69204102 777.369332l202.7441114 56.71889982-121.01084855-238.24035081 183.64319921-225.03735499-274.93274359 65.81173664-134.8132156-222.91560675-54.13888506 278.11212959-273.86863313 93.41258714 201.68388457 87.04345884-136.93108022 92.35106576-162.41277156-68.99759534s-89.1665016-40.33651801-89.1665016-110.39563472 91.28954437-94.47281398 91.28954436-94.47281399l270.68406899-84.21100911 45.29330505-263.25083022s21.23042765-104.73720795 93.41258714-104.73720794 101.90475821 83.50548575 138.70589219 138.70589219l75.01202014 125.96504652 268.91572969-70.76852369s220.78997491-46.7056463 89.16650162 141.52928016l-191.07255435 223.62630826 113.22290631 220.7899749s87.75157129 179.7531117-118.88910033 155.68505617l-195.31475626-62.27635263-21.23042765-134.46110119z"
                    fill="#3b82f6"
                    p-id="8752"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
          {/* Bottom area */}
          <div className="text-center md:flex md:items-center md:justify-between mb-8 md:mb-6">
            {/* Social links */}
            <ul className="inline-flex mb-4 md:order-2 md:ml-4 md:mb-0">
              <li>
                <a
                  className="flex justify-center items-center text-blue-600 bg-blue-100 hover:text-white hover:bg-blue-600 rounded-full transition duration-150 ease-in-out"
                  href="https://x.com/yihui_indie"
                  target="_blank"
                  aria-label="推特"
                >
                  <svg
                    className="w-8 h-8 fill-current"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m13.063 9 3.495 4.475L20.601 9h2.454l-5.359 5.931L24 23h-4.938l-3.866-4.893L10.771 23H8.316l5.735-6.342L8 9h5.063Zm-.74 1.347h-1.457l8.875 11.232h1.36l-8.778-11.232Z" />
                  </svg>
                </a>
              </li>
              <li className="ml-4">
                <a
                  className="flex justify-center items-center text-blue-600 bg-blue-100 hover:text-white hover:bg-blue-600 rounded-full transition duration-150 ease-in-out"
                  href="https://space.bilibili.com/39930228"
                  target="_blank"
                  aria-label="B站"
                >
                  <svg
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                  >
                    <path
                      d="M746 386c9.76 0 18 8.24 18 18v341c0 9.76-8.24 18-18 18H278c-9.76 0-18-8.24-18-18V404c0-9.76 8.24-18 18-18h468m0-82H278c-55 0-100 45-100 100v341c0 55 45 100 100 100h468c55 0 100-45 100-100V404c0-55-45-100-100-100z"
                      fill="#1296db"
                    ></path>
                    <path
                      d="M441.28 548.01l-75.34 20.19c-21.78 5.84-44.38-7.21-50.21-28.99-5.84-21.78 7.21-44.38 28.99-50.21l75.34-20.19c21.78-5.84 44.38 7.21 50.21 28.99 5.84 21.78-7.21 44.37-28.99 50.21zM582.72 548.01l75.34 20.19c21.78 5.84 44.38-7.21 50.21-28.99 5.84-21.78-7.21-44.38-28.99-50.21l-75.34-20.19c-21.78-5.84-44.38 7.21-50.21 28.99-5.84 21.78 7.21 44.37 28.99 50.21z"
                      fill="#1296db"
                    ></path>
                    <path
                      d="M367.49 342.1l-59-102.19c-11.27-19.53-4.52-44.73 15.01-56.01 19.53-11.27 44.73-4.52 56.01 15.01l59 102.19c11.27 19.53 4.52 44.73-15.01 56.01-19.53 11.27-44.73 4.51-56.01-15.01zM656.51 342.1l59-102.19c11.27-19.53 4.52-44.73-15.01-56.01-19.53-11.27-44.73-4.52-56.01 15.01l-59 102.19c-11.27 19.53-4.52 44.73 15.01 56.01 19.53 11.27 44.73 4.51 56.01-15.01z"
                      fill="#1296db"
                    ></path>
                  </svg>
                </a>
              </li>
            </ul>
            {/* Left links */}
            <div className="text-sm font-medium md:order-1 space-x-6 mb-2 md:mb-0">
              <Link
                className="text-gray-500 decoration-blue-600 decoration-2 underline-offset-2 hover:underline"
                href="/about"
              >
                关于我们
              </Link>
              <Link
                className="text-gray-500 decoration-blue-600 decoration-2 underline-offset-2 hover:underline"
                href="/contact"
              >
                联系我们
              </Link>
              <Link
                className="text-gray-500 decoration-blue-600 decoration-2 underline-offset-2 hover:underline"
                href="/privacy"
              >
                隐私条款
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
