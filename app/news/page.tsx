import Footer from "@/components/common/footer";
import Header from "@/components/common/header";

export default function News() {
  const news = [
    { id: 1, title: "خبر اول", description: "توضیحات خبر اول." },
    { id: 2, title: "خبر دوم", description: "توضیحات خبر دوم." },
    { id: 3, title: "خبر سوم", description: "توضیحات خبر سوم." },
  ];
  return (
    <main className="min-h-screen flex flex-col items-center justify-start">
      <Header />
      <div className="flex-grow z-10 w-full max-w-5xl items-center justify-between p-4 text-sm ">
        <div className="flex flex-col gap-4">
          {news.length === 0 ? (
            <p className="text-center mt-4 text-orange-500 p-4">
              هیچ خبری وجود ندارد
            </p>
          ) : (
            news.map((item) => (
              <div className="collapse collapse-arrow bg-gray-50">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title text-xl font-medium">
                  {item.title}
                </div>
                <div className="collapse-content">
                  <p>{item.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
