import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import ImageTab from "@/components/image-tab";
import InfoTab from "@/components/info-tab";
import NewsTab from "@/components/news-tab";
import WalletTab from "@/components/wallet-tab";

export default function Profile() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start">
      <Header />
      <div className="flex-grow z-10 w-full max-w-5xl items-center justify-between p-4 text-sm ">
        <div role="tablist" className="tabs tabs-lifted">
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="اطلاعات"
            defaultChecked
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
          >
            <InfoTab />
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="عکس"
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
          >
            <ImageTab />
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab whitespace-nowrap"
            aria-label="کیف پول"
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
          >
            <WalletTab />
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="خبرنامه"
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
          >
            <NewsTab />
          </div>
          
        </div>
      </div>
      <Footer />
    </main>
  );
}
