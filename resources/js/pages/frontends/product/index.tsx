import CtaComponent from "@/components/custom/CtaComponent";
import ProductCard from "@/components/custom/ProductCard";
import Footer from "@/components/footer";
import Navigasi from "@/components/navigasi";
import { Head } from "@inertiajs/react";

export default function ProductIndex() {
  return (
      <>
          <Head title="Produk" />
          <Navigasi />

          <section className="container mx-auto my-15 w-full">
              <div className="grid lg:grid-cols-12">
                  <p className="text-primary-color h2 lg:col-span-4">Produk Kami</p>
                  <div className="flex flex-col gap-y-9 lg:col-span-8">
                      <h1 className="h1">HCL Pump Indonesia Menghadirkan Inovasi dan Kualitas Terbaik untuk Solusi Pompa Air</h1>
                      <p className="p-body-text-lg">
                          HCL Pump Indonesia menyediakan solusi pompa air berkualitas tinggi yang dirancang untuk memenuhi berbagai kebutuhan, mulai
                          dari rumah tangga hingga industri. Dengan sertifikasi SNI, produk kami, seperti pompa submersible dan centrifugal,
                          menawarkan efisiensi energi, daya tahan tinggi, dan instalasi yang mudah.
                      </p>
                  </div>
              </div>
          </section>

          <section className="container mx-auto w-full">
              <div className="grid w-full gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6">
                  <div>
                      <ProductCard />
                  </div>
                  <div>
                      <ProductCard />
                  </div>
                  <div>
                      <ProductCard />
                  </div>
                  <div>
                      <ProductCard />
                  </div>
              </div>
          </section>
          
          <CtaComponent/>

          <Footer />
      </>
  );
}