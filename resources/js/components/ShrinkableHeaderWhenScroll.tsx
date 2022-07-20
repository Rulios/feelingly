import React, {useEffect, useState} from "react";

type Props = {
    children: React.ReactNode;
};

export default function ShrinkableHeaderWhenScroll({children}: Props){

    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const onScroll = () => setOffset(window.pageYOffset);
        // clean up code
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    console.log(children);
    console.log(window.pageYOffset)

    return (children)


}


function shouldShrink() : boolean {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        return true;
    } else {
        return false;
    }
  } 