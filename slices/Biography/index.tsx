import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/app/components/Bounded";
import Heading from "@/app/components/Heading";
import Button from "@/app/components/Button";
import { PrismicNextImage } from "@prismicio/next";
import Avatar from "./Avatar";

/**
 * Props for `Biography`.
 */
export type BiographyProps = SliceComponentProps<Content.BiographySlice>;

/**
 * Component for "Biography" Slices.
 */
const Biography = ({ slice }: BiographyProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid gap-x-8 gap-y-6 md:grid-flow-col-[2fx, 2fx]">
        
        <Heading as= "h1" size="xl" className="col-start-1, justify-center">
          {slice.primary.heading}
        </Heading>

        <div className="prose prose-xl prose-slate prose-invert col-start-1 justify-center">
           <PrismicRichText field={slice.primary.description} />
        </div>
        <Button linkField={slice.primary. button_link} label={slice.primary.button_text}/>

        <Avatar
         image={slice.primary.avatar}className="row-start-1 max-w-sm md:col-start-2 md:row-end-3 justify-center"/>

      </div>
    </Bounded>
  );
};

export default Biography;
