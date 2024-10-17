import { KeyTextField, LinkField } from "@prismicio/client"
import { PrismicNextLink } from "@prismicio/next"
import clsx from "clsx";
import { MdOutlineMan4 } from "react-icons/md";






type ButtonProps = {
    linkField: LinkField;
    label:KeyTextField;
    showIcon?: boolean;
    className?:string;


}

export default function Button ({linkField, label, showIcon=true, className}:ButtonProps){
    return(
        <PrismicNextLink
        field={linkField}
        className={clsx("group relative flex w-fit text-slate-900 items-center justify-center overflow-hidden rounded-md border-2 border-slate-700 bg-slate-50 px-4 py-2  font-bold transition-transform ease-out hover:scale-105",
            className
 )}
 >
    <span className="absolute inset-0 z-0 h-ful translate-y-9 bg-orange-500 transition-transform duration-300 ease-in-out group-hover:translate-y-0"></span>
    <span className="relative flex items-center justify-center gap-3">
        {label} {showIcon &&  <MdOutlineMan4  className ="inline-block"/>}
    </span>
 </PrismicNextLink>


    );
}