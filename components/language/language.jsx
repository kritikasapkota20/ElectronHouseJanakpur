import React from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

const Language = () => {
  const { t, lang } = useTranslation("common");
  const router = useRouter();
  return (
    <div className="fixed lg:top-[20%] top-[6rem] lg:right-2 right-0 z-[999]">
      <div>
        <div className="flex flex-col gap-2">
          {router.locales?.map((item) => (
            <p key={item}>
              <Link href={router.asPath} locale={item}>
                {/* {item} */}
                <img
                  src={`/img/${item === "en-US" ? "usa" : "nepal"}.png`}
                  alt="country-flag"
                  className={`${
                    item === router.locale && "border-2 border-gray-600 rounded"
                  } w-8 h-8`}
                />
              </Link>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Language;
