import stripHTML from "../utils/stripHTML";
import {useState, useEffect} from "react";

type Props = {
    html: string;
};

export default function StrippedHTMLCounter({html}: Props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(stripHTML(html).length);
  }, [html]);

  return <span>{count}</span>;
}