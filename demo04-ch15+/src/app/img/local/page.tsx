import Image from "next/image";
import MyImg1 from "@public/i1.png";

export default function () {
  return <Image loading={"eager"} src={MyImg1} alt={"local img"} />;
}
