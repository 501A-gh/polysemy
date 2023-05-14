import Header from "@/components/Header";
import Editor from "./(editor)/Editor";
import Wallpaper from "./(editor)/Wallpaper";

export default function Home() {
  return (
    <>
      <Wallpaper src={false} />
      <Header />
      <Editor />
    </>
  );
}
