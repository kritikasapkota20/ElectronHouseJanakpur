import { TiktokEmbed } from "@imdbsd/tiktok-embed";
import React from "react";

const TiktokBanner = () => {
  const tiktok = [
    {
      url: "https://www.tiktok.com/@boini_co/video/7276011223072738561?q=tshirt%20for%20girls%20in%20nepal&t=1699169364075",
    },
    {
      url: "https://www.tiktok.com/@queenshop2425/video/7270803396121087239?q=hoodie%20for%20girls%20in%20nepal&t=1699169710365",
    },
    {
      url: "https://www.tiktok.com/@be_intrend/video/7284929564558560530?q=hoodie%20for%20girls%20in%20nepal&t=1699169710365",
    },
    {
      url: "https://www.tiktok.com/@sameer_khan344/video/7177726789421206810?q=hoodie%20for%20girls%20in%20nepal&t=1699169710365",
    },
    {
      url: "https://www.tiktok.com/@eve.collection_/video/7214351979957505281?q=summer%20dress%20for%20girls%20in%20nepal&t=1699169826024",
    },
    {
      url: "https://www.tiktok.com/@r7fashion/video/7273850323859442962?q=summer%20dress%20for%20girls%20in%20nepal&t=1699169826024",
    },
    {
      url: "https://www.tiktok.com/@daisy_mood_1/video/7233007821808225537?q=summer%20dress%20for%20girls%20in%20nepal&t=1699169826024",
    },
    {
      url: "https://www.tiktok.com/@enchanted__clothing/video/7289480728998399234?q=summer%20dress%20for%20girls%20in%20nepal&t=1699169826024",
    },
    {
      url: "https://www.tiktok.com/@mirabomjan06/video/7286706210110328082?q=summer%20dress%20for%20girls%20in%20nepal&t=1699169826024",
    },
    {
      url: "https://www.tiktok.com/@fitsyou07/video/7264874828685970706?q=summer%20dress%20for%20girls%20in%20nepal&t=1699169826024",
    },
    {
      url: "https://www.tiktok.com/@wills.onlineshopping/video/7218087488605195521?q=summer%20dress%20for%20girls%20in%20nepal&t=1699169826024",
    },
    {
      url: "https://www.tiktok.com/@dressifycode/video/7272185169795108103?q=summer%20dress%20for%20girls%20in%20nepal&t=1699169826024",
    },
  ];
  return (
    <div className="container mx-auto">
      <p className="text-lg font-semibold text-gray-600 px-4">
        More from tiktok
      </p>
      <div className="grid lg:grid-cols-4 grid-cols-1 lg:gap-4 gap-2 px-2">
        {tiktok.map((item, i) => (
          <div key={i}>
            <TiktokEmbed url={item.url} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TiktokBanner;
