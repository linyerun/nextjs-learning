import Image from "next/image";

export default function Home() {
  const len = 2;
  return (
    <div>
      <h1>Home</h1>
      {Array.from({ length: len }).map((_, index) => (
        <Image
          key={index}
          loading="eager"
          src={`https://eo-img.521799.xyz/i/pc/img${index + 1}.webp`}
          alt={`${index}`}
          width={192}
          height={108}
        />
      ))}
    </div>
  );
}
