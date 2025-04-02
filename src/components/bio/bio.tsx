import { BIO_TEXT } from "@/lib/constants/bio";
import { ScrollAnimatedText } from "./scroll-animated-text";

export function Bio() {
  return (
    <section className="min-h-[80vh] bg-cocosBlacks px-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-auto py-24">
        <div className="col-span-1 md:col-span-3 mb-6 md:mb-0">
          <h2 className="font-firaCode text-roughAsphalt/90 text-sm">
            about_me
          </h2>
        </div>
        <div className="col-span-1 md:col-start-4 md:col-span-9">
          <ScrollAnimatedText className="font-epilogue text-2xl md:text-3xl xl:text-4xl leading-loose">
            {BIO_TEXT}
          </ScrollAnimatedText>
        </div>
      </div>
    </section>
  );
}
